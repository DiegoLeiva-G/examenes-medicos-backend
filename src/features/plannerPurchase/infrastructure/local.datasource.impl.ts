import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type GetPlannerPurchaseByIdDto,
  PlannerPurchaseSummaryEntity,
  type CreatePlannerPurchaseDto,
  type PlannerPurchaseDatasource,
} from '../domain';
import { caschileDB } from '../../../core/mssqlClient';
import { type DirectorateEntity } from '../../directorate';
import { type ManagementAreaEntity } from '../../managementArea';
import { type CostCenterEntity } from '../../costCenter';
import { type PlannerSummaryEntity } from '../../planner';

export class PlannerPurchaseDatasourceImpl implements PlannerPurchaseDatasource {
  public async getPlannerPurchaseById(getByIdDto: GetPlannerPurchaseByIdDto): Promise<PlannerPurchaseSummaryEntity> {
    const { id } = getByIdDto.data;

    const plannerPurchase = await prisma.plannerPurchase.findUnique({
      select: {
        id: true,
        managementAreaCodeReference: true,
        directorateCodeReference: true,
        costCenterCodeReference: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerPurchase?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorate = await this.getDirectorateByCode(plannerPurchase.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(plannerPurchase.managementAreaCodeReference);
    const costCenter = await this.getCostCenterByCode(plannerPurchase.costCenterCodeReference);

    return PlannerPurchaseSummaryEntity.fromJson({
      id: plannerPurchase.id,
      directorate,
      managementArea,
      costCenter,
    });
  }

  // TODO: validate that data of caschile is correct: ma -> dir -> cc
  public async createPlannerPurchase(createDto: CreatePlannerPurchaseDto): Promise<PlannerPurchaseSummaryEntity> {
    const { costCenterCodeReference, directorateCodeReference, managementAreaCodeReference, plannerId } =
      createDto.getValidatedData();

    const planner = await this.getPlannerById(plannerId ?? '');

    if (planner.plannerPurchase?.id) {
      throw AppError.badRequest(`Ya existe una etapa de compra para la planificación con id ${plannerId} no existe`);
    }

    // TODO: validate planner connected

    const createdPlannerPurchase = await prisma.plannerPurchase.create({
      data: {
        costCenterCodeReference,
        directorateCodeReference,
        managementAreaCodeReference,
        plannerId,
      },
    });

    const directorate = await this.getDirectorateByCode(createdPlannerPurchase.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(createdPlannerPurchase.managementAreaCodeReference);
    const costCenter = await this.getCostCenterByCode(createdPlannerPurchase.costCenterCodeReference);

    return PlannerPurchaseSummaryEntity.fromJson({
      id: createdPlannerPurchase.id,
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
        plannerPurchase: true,
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
