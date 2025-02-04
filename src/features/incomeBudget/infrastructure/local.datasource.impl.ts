import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateIncomeBudgetDetailDto,
  type CreateIncomeBudgetDto,
  type GetIncomeBudgetByIdDto,
  type GetIncomeBudgetDetailByIdDto,
  type IncomeBudgetDatasource,
  IncomeBudgetDetailSummaryEntity,
  IncomeBudgetSummaryEntity,
  type UpdateIncomeBudgetDetailDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class IncomeBudgetDatasourceImpl implements IncomeBudgetDatasource {
  public async getAllIncomeBudgets(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>> {
    const { page, limit } = pagination;

    const where: Prisma.IncomeBudgetWhereInput = {
      archived: false,
    };

    const [totalIncomeBudgets, incomeBudgets] = await prisma.$transaction([
      prisma.incomeBudget.count({ where }),
      prisma.incomeBudget.findMany({
        select: {
          id: true,
          year: true,
          incomeBudgetDetail: {
            select: {
              amount: true,
            },
            where: {
              archived: false,
            },
          },
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalIncomeBudgets / limit);

    return {
      results: incomeBudgets.map(incomeBudget =>
        IncomeBudgetSummaryEntity.fromJson({
          id: incomeBudget.id,
          year: incomeBudget.year,
          incomeBudgetTotal: incomeBudget.incomeBudgetDetail.reduce((acc, detail) => acc + Number(detail.amount), 0),
        }),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalIncomeBudgets,
      totalPages,
    };
  }

  public async getAllIncomeBudgetDetailsByIncomeBudgetId(
    pagination: PaginationDto,
    incomeBudgetId: IncomeBudgetSummaryEntity['id'],
  ): Promise<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>> {
    await this.getIncomeBudgetById({ data: { id: incomeBudgetId }, validate(dto: GetIncomeBudgetByIdDto) {} });

    const { search, page, limit } = pagination;

    const where: Prisma.IncomeBudgetDetailWhereInput = {
      OR: [
        {
          accountCode: {
            contains: search,
            mode: 'insensitive',
          },
          accountName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      incomeBudgetId,
      archived: false,
    };

    const [totalIncomeBudgetDetails, incomeBudgetDetails] = await prisma.$transaction([
      prisma.incomeBudgetDetail.count({ where }),
      prisma.incomeBudgetDetail.findMany({
        select: {
          id: true,
          accountCode: true,
          accountName: true,
          amount: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalIncomeBudgetDetails / limit);

    return {
      results: incomeBudgetDetails.map(incomeBudgetDetail =>
        IncomeBudgetDetailSummaryEntity.fromJson({ ...incomeBudgetDetail, amount: Number(incomeBudgetDetail.amount) }),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalIncomeBudgetDetails,
      totalPages,
    };
  }

  public async getIncomeBudgetById(getByIdDto: GetIncomeBudgetByIdDto): Promise<IncomeBudgetSummaryEntity> {
    const { id } = getByIdDto.data;

    const incomeBudget = await prisma.incomeBudget.findUnique({
      select: {
        id: true,
        year: true,
        incomeBudgetDetail: {
          select: {
            id: true,
            amount: true,
          },
        },
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!incomeBudget?.id) {
      throw AppError.notFound(`Detalle del presupuesto de ingreso con id ${id} no existe`);
    }

    return IncomeBudgetSummaryEntity.fromJson({
      id: incomeBudget.id,
      year: incomeBudget.year,
      incomeBudgetTotal: incomeBudget.incomeBudgetDetail.reduce((acc, item) => acc + Number(item.amount), 0),
    });
  }

  public async getIncomeBudgetDetailById(
    getByIdDto: GetIncomeBudgetDetailByIdDto,
  ): Promise<IncomeBudgetDetailSummaryEntity> {
    const { id } = getByIdDto.data;

    const incomeBudgetDetail = await prisma.incomeBudgetDetail.findUnique({
      select: {
        id: true,
        accountName: true,
        accountCode: true,
        amount: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!incomeBudgetDetail?.id) {
      throw AppError.notFound(`Detalle del presupuesto de ingreso con id ${id} no existe`);
    }

    return IncomeBudgetDetailSummaryEntity.fromJson({
      ...incomeBudgetDetail,
      amount: Number(incomeBudgetDetail.amount),
    });
  }

  public async createIncomeBudget(createDto: CreateIncomeBudgetDto): Promise<IncomeBudgetSummaryEntity> {
    const { year } = createDto.getValidatedData();

    const alreadyIncomeBudget = await prisma.incomeBudget.findFirst({
      select: {
        id: true,
      },
      where: {
        year,
        archived: false,
      },
    });

    if (alreadyIncomeBudget?.id) {
      throw AppError.badRequest(`Presupuesto de ingreso con año ${year} ya existe, intente con otro`);
    }

    const createdIncomeBudget = await prisma.incomeBudget.create({
      data: {
        year,
      },
    });

    return IncomeBudgetSummaryEntity.fromJson({ ...createdIncomeBudget, incomeBudgetTotal: 0 });
  }

  public async createIncomeBudgetDetail(
    createDto: CreateIncomeBudgetDetailDto,
  ): Promise<IncomeBudgetDetailSummaryEntity> {
    const { incomeBudgetId, amount, accountName, accountCode } = createDto.getValidatedData();

    await this.getIncomeBudgetById({ data: { id: incomeBudgetId }, validate(dto: GetIncomeBudgetByIdDto) {} });

    const alreadyIncomeBudgetDetail = await prisma.incomeBudgetDetail.findFirst({
      select: {
        id: true,
      },
      where: {
        accountCode: accountCode.trim(),
        archived: false,
      },
    });

    if (alreadyIncomeBudgetDetail?.id) {
      throw AppError.badRequest(
        `Detalle de presupuesto de ingreso con código ${accountCode} ya existe, intente con otro`,
      );
    }

    const createdIncomeBudgetDetail = await prisma.incomeBudgetDetail.create({
      data: {
        incomeBudget: {
          connect: {
            id: incomeBudgetId,
          },
        },
        amount,
        accountName,
        accountCode: accountCode.trim(),
      },
    });

    return IncomeBudgetDetailSummaryEntity.fromJson({
      ...createdIncomeBudgetDetail,
      amount: Number(createdIncomeBudgetDetail.amount),
    });
  }

  public async updateIncomeBudgetDetail(
    updateDto: UpdateIncomeBudgetDetailDto,
  ): Promise<IncomeBudgetDetailSummaryEntity> {
    const { id } = await this.getIncomeBudgetDetailById(updateDto);
    const { accountName, amount } = updateDto.getValidatedData();

    const updatedIncomeBudgetDetail = await prisma.incomeBudgetDetail.update({
      data: {
        accountName,
        amount,
      },
      where: {
        id,
      },
    });

    return IncomeBudgetDetailSummaryEntity.fromJson({
      ...updatedIncomeBudgetDetail,
      amount: Number(updatedIncomeBudgetDetail.amount),
    });
  }

  public async deleteIncomeBudgetDetailById(
    getByIdDto: GetIncomeBudgetDetailByIdDto,
  ): Promise<IncomeBudgetDetailSummaryEntity> {
    const { id } = await this.getIncomeBudgetDetailById(getByIdDto);

    const deletedIncomeBudgetDetail = await prisma.incomeBudgetDetail.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return IncomeBudgetDetailSummaryEntity.fromJson({
      ...deletedIncomeBudgetDetail,
      amount: Number(deletedIncomeBudgetDetail.amount),
    });
  }
}
