import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateMeasureUnitDto,
  type GetMeasureUnitByIdDto,
  type MeasureUnitDatasource,
  MeasureUnitSummaryEntity,
  type UpdateMeasureUnitDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class MeasureUnitDatasourceImpl implements MeasureUnitDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<MeasureUnitSummaryEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.MeasureUnitWhereInput = {
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

    const [totalMeasureUnits, measureUnits] = await prisma.$transaction([
      prisma.measureUnit.count({ where }),
      prisma.measureUnit.findMany({
        select: {
          id: true,
          name: true,
          enabled: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalMeasureUnits / limit);

    return {
      results: measureUnits.map(measureUnit => MeasureUnitSummaryEntity.fromJson(measureUnit)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalMeasureUnits,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    const { id } = getByIdDto.data;

    const measureUnit = await prisma.measureUnit.findUnique({
      select: {
        id: true,
        name: true,
        enabled: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!measureUnit?.id) {
      throw AppError.notFound(`Unidad de medida con id ${id} no existe`);
    }

    return MeasureUnitSummaryEntity.fromJson(measureUnit);
  }

  public async create(createDto: CreateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    const { name, enabled } = createDto.getValidatedData();

    const createdMeasureUnit = await prisma.measureUnit.create({
      data: {
        name,
        enabled,
      },
    });

    return MeasureUnitSummaryEntity.fromJson(createdMeasureUnit);
  }

  public async update(updateDto: UpdateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    const { id } = await this.getById(updateDto);
    const { name, enabled } = updateDto.getValidatedData();

    const updatedMeasureUnit = await prisma.measureUnit.update({
      data: {
        name,
        enabled,
      },
      where: {
        id,
      },
    });

    return MeasureUnitSummaryEntity.fromJson(updatedMeasureUnit);
  }

  public async delete(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedMeasureUnit = await prisma.measureUnit.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return MeasureUnitSummaryEntity.fromJson(deletedMeasureUnit);
  }
}
