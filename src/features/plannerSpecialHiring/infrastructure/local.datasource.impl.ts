import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type GetPlannerSpecialHiringByIdDto,
  type RequestPlannerSpecialHiringDto,
  type PlannerSpecialHiringDatasource,
  PlannerSpecialHiringGetByIdResponseEntity,
  PlannerSpecialHiringRequestResponseEntity,
  type PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
  type PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
  PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity,
  PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity,
  type DeterminatePlannerSpecialHiringDto,
  PlannerSpecialHiringRequestDeterminationResponseEntity,
  type PlannerSpecialHiringEntity,
} from '../domain';
import { caschileDB } from '../../../core/mssqlClient';
import { type DirectorateEntity } from '../../directorate';
import { type ManagementAreaEntity } from '../../managementArea';
import { type CostCenterEntity } from '../../costCenter';
import { type PlannerSummaryEntity } from '../../planner';
import { PlannerSpecialHiringStatus, type Prisma } from '@prisma/client';
import type { PaginationDto, PaginationResponseEntity } from '../../_global';

export class PlannerSpecialHiringDatasourceImpl implements PlannerSpecialHiringDatasource {
  public async getPlannerSpecialHiringById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const plannerSpecialHiring = await prisma.plannerSpecialHiring.findUnique({
      select: {
        id: true,
        status: true,
        managementAreaCodeReference: true,
        directorateCodeReference: true,
        costCenterCodeReference: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerSpecialHiring?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorate = await this.getDirectorateByCode(plannerSpecialHiring.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(plannerSpecialHiring.managementAreaCodeReference);
    const costCenter = await this.getCostCenterByCode(plannerSpecialHiring.costCenterCodeReference);

    return PlannerSpecialHiringGetByIdResponseEntity.fromJson({
      id: plannerSpecialHiring.id,
      status: plannerSpecialHiring.status,
      directorate,
      managementArea,
      costCenter,
    });
  }

  // TODO: validate that data of caschile is correct: ma -> dir -> cc: 1 -> n -> 78
  public async requestPlannerSpecialHiring(
    requestDto: RequestPlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestResponseEntity> {
    const { directorateCodeReference, plannerId } = requestDto.getValidatedData();

    const planner = await this.getPlannerById(plannerId ?? '');

    if (planner.plannerSpecialHiring?.id) {
      throw AppError.badRequest(
        `Ya existe una etapa de contratación de honorarios a suma alzada para la planificación con id ${plannerId} no existe`,
      );
    }

    // TODO: validate planner connected
    const requestedPlannerSpecialHiring = await prisma.plannerSpecialHiring.create({
      data: {
        costCenterCodeReference: 78,
        directorateCodeReference,
        managementAreaCodeReference: 1,
        status: PlannerSpecialHiringStatus.Sent,
        plannerId,
      },
    });

    const directorate = await this.getDirectorateByCode(requestedPlannerSpecialHiring.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(
      requestedPlannerSpecialHiring.managementAreaCodeReference,
    );
    const costCenter = await this.getCostCenterByCode(requestedPlannerSpecialHiring.costCenterCodeReference);

    return PlannerSpecialHiringRequestResponseEntity.fromJson({
      id: requestedPlannerSpecialHiring.id,
      directorate,
      managementArea,
      costCenter,
    });
  }

  public async getAllPlannerSpecialHiringRequestImprovementProject(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.PlannerSpecialHiringWhereInput = {
      planner: {
        year: {
          equals: processYear,
        },
        improvementProjectId: {
          not: null,
        },
      },
      status: {
        equals: status,
      },
      OR: [
        {
          planner: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          planner: {
            improvementProject: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
      archived: false,
    };

    const [totalPlannerSpecialHirings, plannerSpecialHirings] = await prisma.$transaction([
      prisma.plannerSpecialHiring.count({ where }),
      prisma.plannerSpecialHiring.findMany({
        select: {
          id: true,
          planner: {
            select: {
              id: true,
              name: true,
              year: true,
              improvementProject: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          directorateCodeReference: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalPlannerSpecialHirings / limit);
    const directorate = await this.getDirectorates();

    return {
      results: plannerSpecialHirings.map(item => {
        const alreadyDirectorate = directorate.find(dir => dir.Codigo_Direccion === item.directorateCodeReference);

        return {
          ...item,
          directorate: {
            Codigo_Direccion: alreadyDirectorate?.Codigo_Direccion ?? 0,
            DESCRIPCION: alreadyDirectorate?.DESCRIPCION ?? '',
          },
        };
      }),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerSpecialHirings,
      totalPages,
    };
  }

  public async getAllPlannerSpecialHiringRequestInvestmentInitiative(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>> {
    const { page, limit, search } = pagination;
    console.log({ status });

    const where: Prisma.PlannerSpecialHiringWhereInput = {
      planner: {
        year: {
          equals: processYear,
        },
        investmentInitiativeId: {
          not: null,
        },
      },
      status: {
        equals: status,
      },
      OR: [
        {
          planner: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          planner: {
            investmentInitiative: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
      archived: false,
    };

    const [totalPlannerSpecialHirings, plannerSpecialHirings] = await prisma.$transaction([
      prisma.plannerSpecialHiring.count({ where }),
      prisma.plannerSpecialHiring.findMany({
        select: {
          id: true,
          planner: {
            select: {
              id: true,
              name: true,
              year: true,
              investmentInitiative: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          directorateCodeReference: true,
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalPlannerSpecialHirings / limit);
    const directorate = await this.getDirectorates();

    return {
      results: plannerSpecialHirings.map(item => {
        const alreadyDirectorate = directorate.find(dir => dir.Codigo_Direccion === item.directorateCodeReference);

        return {
          ...item,
          directorate: {
            Codigo_Direccion: alreadyDirectorate?.Codigo_Direccion ?? 0,
            DESCRIPCION: alreadyDirectorate?.DESCRIPCION ?? '',
          },
        };
      }),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerSpecialHirings,
      totalPages,
    };
  }

  public async getPlannerSpecialHiringRequestDetailInvestmentInitiativeById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity> {
    const { id } = getByIdDto.data;

    const plannerSpecialHiring = await prisma.plannerSpecialHiring.findUnique({
      select: {
        id: true,
        directorateCodeReference: true,
        planner: {
          select: {
            id: true,
            name: true,
            year: true,
            investmentInitiative: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        id,
        archived: false,
        planner: {
          investmentInitiativeId: {
            not: null,
          },
        },
      },
    });

    if (!plannerSpecialHiring?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorate = await this.getDirectorateByCode(plannerSpecialHiring.directorateCodeReference);

    return PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity.fromJson({
      ...plannerSpecialHiring,
      directorate,
    });
  }

  public async getPlannerSpecialHiringRequestDetailImprovementProjectById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity> {
    const { id } = getByIdDto.data;

    const plannerSpecialHiring = await prisma.plannerSpecialHiring.findUnique({
      select: {
        id: true,
        directorateCodeReference: true,
        planner: {
          select: {
            id: true,
            name: true,
            year: true,
            improvementProject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        id,
        archived: false,
        planner: {
          improvementProjectId: {
            not: null,
          },
        },
      },
    });

    if (!plannerSpecialHiring?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorate = await this.getDirectorateByCode(plannerSpecialHiring.directorateCodeReference);

    return PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity.fromJson({
      ...plannerSpecialHiring,
      directorate,
    });
  }

  public async determinatePlannerSpecialHiring(
    determinateDto: DeterminatePlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestDeterminationResponseEntity> {
    const { id, status, observation } = determinateDto.getValidatedData();

    // TODO: validate planner connected
    const determinatePlannerSpecialHiring = await prisma.plannerSpecialHiring.update({
      data: {
        status,
        observation,
      },
      where: {
        id,
      },
    });

    const directorate = await this.getDirectorateByCode(determinatePlannerSpecialHiring.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(
      determinatePlannerSpecialHiring.managementAreaCodeReference,
    );
    const costCenter = await this.getCostCenterByCode(determinatePlannerSpecialHiring.costCenterCodeReference);

    return PlannerSpecialHiringRequestDeterminationResponseEntity.fromJson({
      id: determinatePlannerSpecialHiring.id,
      status: determinatePlannerSpecialHiring.status,
      directorate,
      managementArea,
      costCenter,
    });
  }

  // TODO: use functions from correct entities

  private async getManagementAreaByCode(managementAreaCode: number): Promise<ManagementAreaEntity> {
    const managementAreas = await caschileDB<ManagementAreaEntity>(
      `SELECT Codigo_AreaGestion, Descripcion_AreaGestion FROM Guberna.dbo.AreadeGestion WHERE Ano_Proceso = ${new Date().getFullYear() - 1} AND Codigo_AreaGestion = ${managementAreaCode} ORDER BY Codigo_AreaGestion`,
    );

    const alreadyManagementArea = managementAreas.recordset[0];

    if (!alreadyManagementArea?.Codigo_AreaGestion) {
      throw AppError.notFound(`Área de gestión con código ${managementAreaCode} no existe`);
    }

    return alreadyManagementArea;
  }

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

  private async getDirectorates(): Promise<DirectorateEntity[]> {
    const directorates = await caschileDB<DirectorateEntity>(
      'select Codigo_Direccion, DESCRIPCION from Comun.dbo.Direcciones where Codigo_Area = 1',
    );

    return directorates.recordset;
  }

  private async getCostCenterByCode(costCenterCode: number): Promise<CostCenterEntity> {
    const costCenters = await caschileDB<CostCenterEntity>(
      `SELECT Codigo_Centro_Costo, Descripcion FROM Comun.dbo.Centro_Costo WHERE Codigo_Centro_Costo = ${costCenterCode} ORDER BY Codigo_Centro_Costo`,
    );

    const alreadyCostCenter = costCenters.recordset[0];

    if (!alreadyCostCenter?.Codigo_Centro_Costo) {
      throw AppError.notFound(`Centro de costo con código ${costCenterCode} no existe`);
    }

    return alreadyCostCenter;
  }

  private async getPlannerById(id: PlannerSummaryEntity['id']): Promise<PlannerSummaryEntity> {
    const planner = await prisma.planner.findUnique({
      select: {
        id: true,
        name: true,
        year: true,
        plannerSpecialHiring: true,
      },
      where: {
        id,
        archived: false,
        enabled: true,
      },
    });

    if (!planner?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    return planner;
  }
}
