import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type GetPlannerCouncilorSalaryByIdDto,
  PlannerCouncilorSalaryCreateResponseEntity,
  PlannerCouncilorSalaryGetByIdResponseEntity,
  type CreatePlannerCouncilorSalaryDto,
  type PlannerCouncilorSalaryDatasource,
} from '../domain';
import { caschileDB } from '../../../core/mssqlClient';
import { type DirectorateEntity } from '../../directorate';
import { type ManagementAreaEntity } from '../../managementArea';
import { type CostCenterEntity } from '../../costCenter';
import { type PlannerSummaryEntity } from '../../planner';

export class PlannerCouncilorSalaryDatasourceImpl implements PlannerCouncilorSalaryDatasource {
  public async getPlannerCouncilorSalaryById(
    getByIdDto: GetPlannerCouncilorSalaryByIdDto,
  ): Promise<PlannerCouncilorSalaryGetByIdResponseEntity> {
    const { id } = getByIdDto.data;

    const plannerCouncilorSalary = await prisma.plannerCouncilorSalary.findUnique({
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

    if (!plannerCouncilorSalary?.id) {
      throw AppError.notFound(`Planificación con id ${id} no existe`);
    }

    const directorate = await this.getDirectorateByCode(plannerCouncilorSalary.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(plannerCouncilorSalary.managementAreaCodeReference);
    const costCenter = await this.getCostCenterByCode(plannerCouncilorSalary.costCenterCodeReference);

    return PlannerCouncilorSalaryGetByIdResponseEntity.fromJson({
      id: plannerCouncilorSalary.id,
      directorate,
      managementArea,
      costCenter,
    });
  }

  // TODO: validate that data of caschile is correct: ma -> dir -> cc
  public async createPlannerCouncilorSalary(
    createDto: CreatePlannerCouncilorSalaryDto,
  ): Promise<PlannerCouncilorSalaryCreateResponseEntity> {
    const { plannerId } = createDto.getValidatedData();

    const planner = await this.getPlannerById(plannerId ?? '');

    if (planner.plannerCouncilorSalary?.id) {
      throw AppError.badRequest(`Ya existe una etapa de compra para la planificación con id ${plannerId} no existe`);
    }

    // TODO: validate planner connected
    // TODO: Change hardcoded values
    const createdPlannerCouncilorSalary = await prisma.plannerCouncilorSalary.create({
      data: {
        costCenterCodeReference: 7,
        directorateCodeReference: 4,
        managementAreaCodeReference: 1,
        plannerId,
      },
    });

    const directorate = await this.getDirectorateByCode(createdPlannerCouncilorSalary.directorateCodeReference);
    const managementArea = await this.getManagementAreaByCode(
      createdPlannerCouncilorSalary.managementAreaCodeReference,
    );
    const costCenter = await this.getCostCenterByCode(createdPlannerCouncilorSalary.costCenterCodeReference);

    return PlannerCouncilorSalaryCreateResponseEntity.fromJson({
      id: createdPlannerCouncilorSalary.id,
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
        plannerCouncilorSalary: true,
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
