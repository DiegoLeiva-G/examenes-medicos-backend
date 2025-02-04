import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { type PladecoDatasource, SpecificPladecoToListEntity, StrategicPladecoToListEntity } from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class PladecoDatasourceImpl implements PladecoDatasource {
  public async getStrategics(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<StrategicPladecoToListEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.StrategicPladecoWhereInput = {
      OR: [
        {
          strategicLine: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          strategicObjective: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      archived: false,
    };

    const [totalStrategicsPladeco, strategicsPladeco] = await prisma.$transaction([
      prisma.strategicPladeco.count({ where }),
      prisma.strategicPladeco.findMany({
        select: {
          id: true,
          correlative: true,
          strategicLine: true,
          strategicObjective: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalStrategicsPladeco / limit);

    return {
      results: strategicsPladeco.map(strategicPladeco => StrategicPladecoToListEntity.fromJson(strategicPladeco)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalStrategicsPladeco,
      totalPages,
    };
  }

  public async getSpecifics(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<SpecificPladecoToListEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.SpecificPladecoWhereInput = {
      OR: [
        {
          specificLine: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          specificObjective: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      archived: false,
    };

    const [totalSpecificsPladeco, strategicsPladeco] = await prisma.$transaction([
      prisma.specificPladeco.count({ where }),
      prisma.specificPladeco.findMany({
        select: {
          id: true,
          correlative: true,
          specificLine: true,
          specificObjective: true,
          strategicPladeco: {
            select: {
              id: true,
              correlative: true,
              strategicLine: true,
              strategicObjective: true,
            },
          },
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalSpecificsPladeco / limit);

    return {
      results: strategicsPladeco.map(specificPladeco => SpecificPladecoToListEntity.fromJson(specificPladeco)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalSpecificsPladeco,
      totalPages,
    };
  }
}
