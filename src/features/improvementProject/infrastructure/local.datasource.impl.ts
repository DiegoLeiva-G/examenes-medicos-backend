import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreateImprovementProjectDto,
  type GetImprovementProjectByIdDto,
  type ImprovementProjectDatasource,
  ImprovementProjectEntity,
  ImprovementProjectEntityToList,
  ImprovementProjectSummaryEntity,
  type UpdateImprovementProjectDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import { caschileDB } from '../../../core/mssqlClient';
import { endOfDay, startOfDay } from 'date-fns';

export class ImprovementProjectDatasourceImpl implements ImprovementProjectDatasource {
  private async getDirectorates(): Promise<Array<{ Codigo_Direccion: number; DESCRIPCION: string }>> {
    const directorates = await caschileDB<{ Codigo_Direccion: number; DESCRIPCION: string }>(
      'select Codigo_Direccion, DESCRIPCION from Comun.dbo.Direcciones where Codigo_Area = 1',
    );

    return directorates.recordset;
  }

  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ImprovementProjectEntityToList[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.ImprovementProjectWhereInput = {
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

    const [totalImprovementProjects, improvementProjects] = await prisma.$transaction([
      prisma.improvementProject.count({ where }),
      prisma.improvementProject.findMany({
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

    const totalPages = Math.ceil(totalImprovementProjects / limit);

    const directorates = await this.getDirectorates();

    return {
      results: improvementProjects.map(({ directorateResponsibleCodeReference, ...restData }) => {
        const directorateResponsible =
          directorates.find(directorate => directorate.Codigo_Direccion === directorateResponsibleCodeReference)
            ?.DESCRIPCION ?? '';

        return ImprovementProjectEntityToList.fromJson({ ...restData, directorateResponsible });
      }),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalImprovementProjects,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectSummaryEntity> {
    const { id } = getByIdDto.data;

    const improvementProject = await prisma.improvementProject.findUnique({
      select: {
        id: true,
        name: true,
        directorateResponsibleCodeReference: true,
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

    if (!improvementProject?.id) {
      throw AppError.notFound(`Proyecto de mejoramiento con id ${id} no existe`);
    }

    const {
      name,
      directorateResponsibleCodeReference,
      fundingSource,
      endDate,
      legalNorms,
      startDate,
      specificPladeco,
    } = improvementProject;

    const directorates = await this.getDirectorates();

    const getDirectorateName = (directorateCode: number): string =>
      directorates.find(directorate => directorate.Codigo_Direccion === directorateCode)?.DESCRIPCION ?? '';

    return ImprovementProjectSummaryEntity.fromJson({
      id,
      name,
      startDate,
      endDate,
      legalNorms,
      directorateResponsible: {
        Codigo_Direccion: directorateResponsibleCodeReference,
        DESCRIPCION: getDirectorateName(directorateResponsibleCodeReference),
      },
      fundingSource,
      specificPladeco,
    });
  }

  // TODO: validate startDate < endDate
  public async create(createDto: CreateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    const { name, directorateResponsibleCodeReference, specificPladecoIds, startDate, endDate, legalNorms } =
      createDto.getValidatedData();

    const fundingSource = await prisma.fundingSource.findFirst({
      select: {
        id: true,
      },
      where: {
        main: true,
      },
    });

    const createdImprovementProject = await prisma.improvementProject.create({
      data: {
        name,
        directorateResponsibleCodeReference,
        ...(fundingSource?.id
          ? {
              fundingSource: {
                connect: {
                  id: fundingSource.id,
                },
              },
            }
          : {}),
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

    return ImprovementProjectEntity.fromJson(createdImprovementProject);
  }

  // TODO: validate startDate < endDate
  public async update(updateDto: UpdateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    const { id, specificPladeco } = await this.getById(updateDto);
    const { name, directorateResponsibleCodeReference, specificPladecoIds, startDate, endDate, legalNorms } =
      updateDto.getValidatedData();

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

    const updatedImprovementProject = await prisma.improvementProject.update({
      data: {
        name,
        directorateResponsibleCodeReference,
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

    return ImprovementProjectEntity.fromJson(updatedImprovementProject);
  }

  public async delete(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedImprovementProject = await prisma.improvementProject.update({
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

    return ImprovementProjectEntity.fromJson(deletedImprovementProject);
  }
}
