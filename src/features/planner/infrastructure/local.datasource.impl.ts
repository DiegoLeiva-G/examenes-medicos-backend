import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreatePlannerToInvestmentInitiativeDto,
  type CreatePlannerToImprovementProjectDto,
  type GetPlannerByIdDto,
  type PlannerDatasource,
  PlannerSummaryEntity,
  type UpdatePlannerDto,
  type PlannerEntity,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type InvestmentInitiativeEntity } from '../../investmentInitiative';
import { type ImprovementProjectEntity } from '../../improvementProject';
import { caschileDB } from '../../../core/mssqlClient';
import { type DirectorateEntity } from '../../directorate';

export class PlannerDatasourceImpl implements PlannerDatasource {
  public async getAllPlannersByInvestmentInitiativeId(
    investmentInitiativeId: InvestmentInitiativeEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    const where: Prisma.PlannerWhereInput = {
      investmentInitiativeId,
      archived: false,
    };

    const [totalPlanners, planners] = await prisma.$transaction([
      prisma.planner.count({ where }),
      prisma.planner.findMany({
        select: {
          id: true,
          name: true,
          year: true,
        },
        where,
      }),
    ]);

    return {
      results: planners.map(planner => PlannerSummaryEntity.fromJson(planner)),
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      total: totalPlanners,
      totalPages: 1,
    };
  }

  public async getAllPlannersByImprovementProjectId(
    improvementProjectId: ImprovementProjectEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    const where: Prisma.PlannerWhereInput = {
      improvementProjectId,
      archived: false,
    };

    const [totalPlanners, planners] = await prisma.$transaction([
      prisma.planner.count({ where }),
      prisma.planner.findMany({
        select: {
          id: true,
          name: true,
          year: true,
        },
        where,
      }),
    ]);

    return {
      results: planners.map(planner => PlannerSummaryEntity.fromJson(planner)),
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      total: totalPlanners,
      totalPages: 1,
    };
  }

  public async getPlannerById(getByIdDto: GetPlannerByIdDto): Promise<PlannerSummaryEntity> {
    const { id } = getByIdDto.data;

    const planner = await prisma.planner.findUnique({
      select: {
        id: true,
        name: true,
        year: true,
        plannerPurchase: {
          select: {
            id: true,
          },
        },
        plannerHiring: {
          select: {
            id: true,
          },
        },
        plannerSpecialHiring: {
          select: {
            id: true,
            status: true,
          },
        },
        plannerSubsidy: {
          select: {
            id: true,
          },
        },
        plannerCouncilorSalary: {
          select: {
            id: true,
          },
        },
        plannerOperational: {
          select: {
            id: true,
          },
        },
        improvementProject: {
          select: {
            id: true,
            name: true,
            directorateResponsibleCodeReference: true,
          },
        },
        investmentInitiative: {
          select: {
            id: true,
            name: true,
            directorateResponsibleCodeReference: true,
          },
        },
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!planner?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorateResponsible = await this.getDirectorateByCode(
      planner.investmentInitiative?.directorateResponsibleCodeReference ??
        planner.improvementProject?.directorateResponsibleCodeReference ??
        0,
    );

    return PlannerSummaryEntity.fromJson({
      ...planner,
      investmentInitiative: planner.investmentInitiative?.id
        ? {
            ...planner.investmentInitiative,
            directorateResponsible,
          }
        : null,
      improvementProject: planner.improvementProject?.id
        ? {
            ...planner.improvementProject,
            directorateResponsible,
          }
        : null,
    });
  }

  public async createPlannerToInvestmentInitiative(
    createDto: CreatePlannerToInvestmentInitiativeDto,
  ): Promise<PlannerSummaryEntity> {
    const { name, year, investmentInitiativeId } = createDto.getValidatedData();

    await this.validatePlanner({ investmentInitiativeId, year });

    const createdPlanner = await prisma.planner.create({
      data: {
        name,
        year,
        startDate: new Date(`${year}-01-01`),
        endDate: new Date(`${year}-12-31`),
        investmentInitiativeId,
      },
    });

    return PlannerSummaryEntity.fromJson(createdPlanner);
  }

  public async createPlannerToImprovementProject(
    createDto: CreatePlannerToImprovementProjectDto,
  ): Promise<PlannerSummaryEntity> {
    const { name, year, improvementProjectId } = createDto.getValidatedData();

    await this.validatePlanner({ improvementProjectId, year });

    const createdPlanner = await prisma.planner.create({
      data: {
        name,
        year,
        startDate: new Date(`${year}-01-01`),
        endDate: new Date(`${year}-12-31`),
        improvementProjectId,
      },
    });

    return PlannerSummaryEntity.fromJson(createdPlanner);
  }

  public async updatePlanner(updateDto: UpdatePlannerDto): Promise<PlannerSummaryEntity> {
    const { id } = await this.getPlannerById(updateDto);
    const { name } = updateDto.getValidatedData();

    const updatedPlanner = await prisma.planner.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return PlannerSummaryEntity.fromJson(updatedPlanner);
  }

  // Private function from another entities

  private async getDirectorateByCode(directorateCode: number): Promise<DirectorateEntity> {
    const directorates = await caschileDB<DirectorateEntity>(
      `select Codigo_Direccion, DESCRIPCION from Comun.dbo.Direcciones where Codigo_Area = 1 AND Codigo_Direccion = ${directorateCode}`,
    );

    const alreadyDirectorate = directorates.recordset[0];

    if (!alreadyDirectorate?.Codigo_Direccion) {
      throw AppError.notFound(`Dirección con código ${directorateCode} no existe`);
    }

    return alreadyDirectorate;
  }

  private async validatePlanner(data: {
    investmentInitiativeId?: PlannerEntity['investmentInitiativeId'];
    improvementProjectId?: PlannerEntity['improvementProjectId'];
    year: PlannerEntity['year'];
  }): Promise<void> {
    const { year, improvementProjectId, investmentInitiativeId } = data;
    const alreadyPlanner = await prisma.planner.findFirst({
      where: {
        year,
        OR: [{ improvementProjectId }, { investmentInitiativeId }],
        archived: false,
        enabled: true,
      },
      select: {
        id: true,
      },
    });

    if (alreadyPlanner?.id) {
      throw AppError.badRequest(`Ya existe una planificación con año ${year}`);
    }
  }
}
