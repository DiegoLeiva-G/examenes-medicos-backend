import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateInvestmentInitiativeDto,
  type GetInvestmentInitiativeByIdDto,
  type InvestmentInitiativeDatasource,
  InvestmentInitiativeEntity,
  InvestmentInitiativeEntityToList,
  InvestmentInitiativeSummaryEntity,
  type UpdateInvestmentInitiativeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import { caschileDB } from '../../../core/mssqlClient';
import { endOfDay, startOfDay } from 'date-fns';

export class InvestmentInitiativeDatasourceImpl implements InvestmentInitiativeDatasource {
  private async getDirectorates(): Promise<Array<{ Codigo_Direccion: number; DESCRIPCION: string }>> {
    const directorates = await caschileDB<{ Codigo_Direccion: number; DESCRIPCION: string }>(
      'select Codigo_Direccion, DESCRIPCION from Comun.dbo.Direcciones where Codigo_Area = 1',
    );

    return directorates.recordset;
  }

  public async getAll(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.InvestmentInitiativeWhereInput = {
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

    const [totalInvestmentInitiatives, investmentInitiatives] = await prisma.$transaction([
      prisma.investmentInitiative.count({ where }),
      prisma.investmentInitiative.findMany({
        select: {
          id: true,
          name: true,
          directorateResponsibleCodeReference: true,
          startDate: true,
          endDate: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalInvestmentInitiatives / limit);

    const directorates = await this.getDirectorates();

    return {
      results: investmentInitiatives.map(({ directorateResponsibleCodeReference, ...restData }) => {
        const directorateResponsible =
          directorates.find(directorate => directorate.Codigo_Direccion === directorateResponsibleCodeReference)
            ?.DESCRIPCION ?? '';

        return InvestmentInitiativeEntityToList.fromJson({ ...restData, directorateResponsible });
      }),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalInvestmentInitiatives,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeSummaryEntity> {
    const { id } = getByIdDto.data;

    const investmentInitiative = await prisma.investmentInitiative.findUnique({
      select: {
        id: true,
        name: true,
        directorateResponsibleCodeReference: true,
        directorateCoResponsibleCodeReference: true,
        startDate: true,
        endDate: true,
        legalNorms: true,
        fundingSource: {
          select: {
            id: true,
            name: true,
            type: true,
            enabled: true,
          },
        },
        specificPladeco: {
          select: {
            id: true,
            correlative: true,
            specificObjective: true,
            specificLine: true,
            strategicPladeco: {
              select: {
                id: true,
                correlative: true,
                strategicLine: true,
                strategicObjective: true,
              },
            },
          },
        },
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!investmentInitiative?.id) {
      throw AppError.notFound(`Iniciativa de inversión con id ${id} no existe`);
    }

    const {
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      fundingSource,
      endDate,
      legalNorms,
      startDate,
      specificPladeco,
    } = investmentInitiative;

    const directorates = await this.getDirectorates();

    const getDirectorateName = (directorateCode: number): string =>
      directorates.find(directorate => directorate.Codigo_Direccion === directorateCode)?.DESCRIPCION ?? '';

    return InvestmentInitiativeSummaryEntity.fromJson({
      id,
      name,
      startDate,
      endDate,
      legalNorms,
      directorateResponsible: {
        Codigo_Direccion: directorateResponsibleCodeReference,
        DESCRIPCION: getDirectorateName(directorateResponsibleCodeReference),
      },
      directorateCoResponsible: directorateCoResponsibleCodeReference.map(directorateCoResponsible => ({
        Codigo_Direccion: directorateCoResponsible,
        DESCRIPCION: getDirectorateName(directorateCoResponsible),
      })),
      fundingSource,
      specificPladeco,
    });
  }

  // TODO: validate startDate < endDate
  public async create(createDto: CreateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    const {
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      fundingSourceIds,
      specificPladecoIds,
      startDate,
      endDate,
      legalNorms,
    } = createDto.getValidatedData();

    const createdInvestmentInitiative = await prisma.investmentInitiative.create({
      data: {
        name,
        directorateResponsibleCodeReference,
        directorateCoResponsibleCodeReference,
        fundingSource: {
          connect: fundingSourceIds.map(id => ({ id })),
        },
        specificPladeco: {
          connect: specificPladecoIds.map(id => ({ id })),
        },
        startDate: startOfDay(startDate),
        endDate: endOfDay(endDate),
        legalNorms,
      },
      include: {
        fundingSource: true,
        specificPladeco: true,
      },
    });

    return InvestmentInitiativeEntity.fromJson(createdInvestmentInitiative);
  }

  // TODO: validate startDate < endDate
  public async update(updateDto: UpdateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    const { id, fundingSource, specificPladeco } = await this.getById(updateDto);
    const {
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      fundingSourceIds,
      specificPladecoIds,
      startDate,
      endDate,
      legalNorms,
    } = updateDto.getValidatedData();

    const specificPladecoToConnect = (specificPladecoIds ?? []).reduce<Array<{ id: string }>>(
      (acc, specificPladecoId) => {
        const alreadyIncluded = (specificPladeco || []).find(
          alreadySpecificPladeco => alreadySpecificPladeco.id === specificPladecoId,
        );

        if (alreadyIncluded?.id) {
          return acc;
        }

        return [...acc, { id: specificPladecoId }];
      },
      [],
    );

    const specificPladecoToDisconnect = (specificPladeco || []).reduce<Array<{ id: string }>>(
      (acc, alreadySpecificPladeco) => {
        const alreadyIncluded = (specificPladecoIds ?? []).find(
          specificPladeco => specificPladeco === alreadySpecificPladeco.id,
        );

        if (alreadyIncluded) {
          return acc;
        }

        return [...acc, { id: alreadySpecificPladeco.id }];
      },
      [],
    );

    const fundingSourceToConnect = (fundingSourceIds ?? []).reduce<Array<{ id: string }>>((acc, fundingSourceId) => {
      const alreadyIncluded = (fundingSource || []).find(
        alreadyFundingSource => alreadyFundingSource.id === fundingSourceId,
      );

      if (alreadyIncluded?.id) {
        return acc;
      }

      return [...acc, { id: fundingSourceId }];
    }, []);

    const fundingSourceToDisconnect = (fundingSource || []).reduce<Array<{ id: string }>>(
      (acc, alreadyFundingSource) => {
        const alreadyIncluded = (fundingSourceIds ?? []).find(
          fundingSource => fundingSource === alreadyFundingSource.id,
        );

        if (alreadyIncluded) {
          return acc;
        }

        return [...acc, { id: alreadyFundingSource.id }];
      },
      [],
    );

    const updatedInvestmentInitiative = await prisma.investmentInitiative.update({
      data: {
        name,
        directorateResponsibleCodeReference,
        directorateCoResponsibleCodeReference,
        ...(fundingSourceIds
          ? {
              fundingSource: {
                connect: fundingSourceToConnect,
                disconnect: fundingSourceToDisconnect,
              },
            }
          : {}),
        ...(specificPladecoIds
          ? {
              specificPladeco: {
                connect: specificPladecoToConnect,
                disconnect: specificPladecoToDisconnect,
              },
            }
          : {}),

        ...(startDate ? { startDate: startOfDay(startDate) } : {}),
        ...(endDate ? { endDate: endOfDay(endDate) } : {}),
        legalNorms,
      },
      include: {
        fundingSource: true,
        specificPladeco: true,
      },
      where: {
        id,
      },
    });

    return InvestmentInitiativeEntity.fromJson(updatedInvestmentInitiative);
  }

  public async delete(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedInvestmentInitiative = await prisma.investmentInitiative.update({
      data: {
        archived: true,
      },
      include: {
        fundingSource: true,
        specificPladeco: true,
      },
      where: {
        id,
      },
    });

    return InvestmentInitiativeEntity.fromJson(deletedInvestmentInitiative);
  }
}
