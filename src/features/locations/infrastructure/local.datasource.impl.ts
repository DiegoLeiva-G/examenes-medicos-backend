import { type Prisma } from '@prisma/client';
import {
  type GetStateByIdDto,
  type LocationDatasource,
  StateEntity,
  StateToSelectEntity,
  SubStateToSelectEntity,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';

export class LocationDatasourceImpl implements LocationDatasource {
  public async getStatesToSelect(pagination: PaginationDto): Promise<PaginationResponseEntity<StateToSelectEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.StateWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };

    const [totalStates, states] = await prisma.$transaction([
      prisma.state.count({ where }),
      prisma.state.findMany({
        select: {
          id: true,
          name: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          correlative: 'asc',
        },
      }),
    ]);

    const totalPages = Math.ceil(totalStates / limit);

    return {
      results: states.map(state => StateToSelectEntity.fromJson(state)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalStates,
      totalPages,
    };
  }

  public async getStateById(getByIdDto: GetStateByIdDto): Promise<StateEntity> {
    const { id } = getByIdDto.data;

    const state = await prisma.state.findUnique({
      where: {
        id,
      },
    });

    if (!state?.id) {
      throw AppError.notFound(`Región con id ${id} no existe`);
    }

    return StateEntity.fromJson(state);
  }

  public async getSubStatesByStateIdToSelect(
    pagination: PaginationDto,
    stateId: StateEntity['id'],
  ): Promise<PaginationResponseEntity<SubStateToSelectEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.SubStateWhereInput = {
      OR: [
        {
          city: {
            some: {
              name: { contains: search, mode: 'insensitive' },
            },
          },
        },
      ],
      stateId,
    };

    const [totalSubStates, subStates] = await prisma.$transaction([
      prisma.subState.count({ where }),
      prisma.subState.findMany({
        select: {
          id: true,
          name: true,
          city: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalSubStates / limit);

    return {
      results: subStates.map(subState => SubStateToSelectEntity.fromJson(subState)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalSubStates,
      totalPages,
    };
  }
}
