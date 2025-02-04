import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateFundingSourceDto,
  type GetFundingSourceByIdDto,
  type FundingSourceDatasource,
  FundingSourceSummaryEntity,
  type UpdateFundingSourceDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class FundingSourceDatasourceImpl implements FundingSourceDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<FundingSourceSummaryEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.FundingSourceWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      archived: false,
    };

    const [totalFundingSources, fundingSources] = await prisma.$transaction([
      prisma.fundingSource.count({ where }),
      prisma.fundingSource.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          enabled: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalFundingSources / limit);

    return {
      results: fundingSources.map(fundingSource => FundingSourceSummaryEntity.fromJson(fundingSource)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalFundingSources,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    const { id } = getByIdDto.data;

    const fundingSource = await prisma.fundingSource.findUnique({
      select: {
        id: true,
        name: true,
        type: true,
        enabled: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!fundingSource?.id) {
      throw AppError.notFound(`Fuente de financiamiento con id ${id} no existe`);
    }

    return FundingSourceSummaryEntity.fromJson(fundingSource);
  }

  public async create(createDto: CreateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    const { name, type, enabled } = createDto.getValidatedData();

    const createdFundingSource = await prisma.fundingSource.create({
      data: {
        name,
        type,
        enabled,
      },
    });

    return FundingSourceSummaryEntity.fromJson(createdFundingSource);
  }

  public async update(updateDto: UpdateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    const { id } = await this.getById(updateDto);
    const { name, type, enabled } = updateDto.getValidatedData();

    const updatedFundingSource = await prisma.fundingSource.update({
      data: {
        name,
        type,
        enabled,
      },
      where: {
        id,
      },
    });

    return FundingSourceSummaryEntity.fromJson(updatedFundingSource);
  }

  // TODO: validate that main record cannot be deleted
  public async delete(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedFundingSource = await prisma.fundingSource.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return FundingSourceSummaryEntity.fromJson(deletedFundingSource);
  }
}
