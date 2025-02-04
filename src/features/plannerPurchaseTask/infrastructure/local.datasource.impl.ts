import { PlannerTaskStatus, type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreatePlannerPurchaseTaskDto,
  type GetPlannerPurchaseTaskByIdDto,
  type PlannerPurchaseTaskDatasource,
  PlannerPurchaseTaskExtendedEntity,
  PlannerPurchaseTaskSummaryEntity,
  type UpdatePlannerPurchaseTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerPurchaseEntity } from '../../plannerPurchase';
import { type MeasureUnitSummaryEntity } from '../../measureUnit';
import { type AccountPlanEntity } from '../../accountPlan';
import { caschileDB } from '../../../core/mssqlClient';

export class PlannerPurchaseTaskDatasourceImpl implements PlannerPurchaseTaskDatasource {
  public async getAllByPlannerPurchaseId(
    plannerPurchaseId: PlannerPurchaseEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>> {
    if (!plannerPurchaseId) {
      throw AppError.badRequest('Error validar las tareas de compra', [
        { field: 'plannerPurchaseId', constraint: 'plannerPurchaseId is required' },
      ]);
    }

    await this.getPlannerPurchaseById(plannerPurchaseId);

    const where: Prisma.PlannerPurchaseTaskWhereInput = {
      plannerPurchaseId,
      archived: false,
    };

    const [totalPlannerPurchaseTasks, plannerPurchaseTasks] = await prisma.$transaction([
      prisma.plannerPurchaseTask.count({ where }),
      prisma.plannerPurchaseTask.findMany({
        select: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
        },
        where,
      }),
    ]);

    const page = 1;
    const totalPages = 1;

    return {
      results: plannerPurchaseTasks.map(plannerPurchaseTask =>
        PlannerPurchaseTaskSummaryEntity.fromJson(plannerPurchaseTask),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerPurchaseTasks,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskExtendedEntity> {
    const { id } = getByIdDto.data;

    const plannerPurchaseTask = await prisma.plannerPurchaseTask.findUnique({
      select: {
        id: true,
        name: true,
        expectedQuantityGoal: true,
        minimumQuantityGoal: true,
        startDate: true,
        endDate: true,
        accountPlanCodeReference: true,
        totalBudgetAmount: true,
        approvedBudget: true,
        measureUnit: {
          select: {
            id: true,
            name: true,
            enabled: true,
          },
        },
        createdAt: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerPurchaseTask?.id) {
      throw AppError.notFound(`Tarea de compra con id ${id} no existe`);
    }

    const accountPlanCode = await this.getAccountByCode(plannerPurchaseTask.accountPlanCodeReference);

    return PlannerPurchaseTaskExtendedEntity.fromJson({
      ...plannerPurchaseTask,
      approvedBudget: Number(plannerPurchaseTask.approvedBudget),
      totalBudgetAmount: Number(plannerPurchaseTask.totalBudgetAmount),
      accountPlanCode,
    });
  }

  public async create(createDto: CreatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      plannerPurchaseId,
      accountPlanCodeReference,
      totalBudgetAmount,
      startDate,
      endDate,
      measureUnitId,
    } = createDto.getValidatedData();

    await this.getMeasureUnitById(measureUnitId);
    await this.getAccountByCode(accountPlanCodeReference);
    await this.getPlannerPurchaseById(plannerPurchaseId);

    const createdPlannerPurchaseTask = await prisma.plannerPurchaseTask.create({
      data: {
        name,
        measureUnit: {
          connect: {
            id: measureUnitId,
          },
        },
        expectedQuantityGoal,
        minimumQuantityGoal,
        accountPlanCodeReference,
        startDate,
        endDate,
        totalBudgetAmount,
        plannerPurchase: {
          connect: {
            id: plannerPurchaseId,
          },
        },
        status: PlannerTaskStatus.NotInitialized,
      },
    });

    return PlannerPurchaseTaskSummaryEntity.fromJson(createdPlannerPurchaseTask);
  }

  public async update(updateDto: UpdatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    const { id } = await this.getById(updateDto);
    const {
      name,
      measureUnitId,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
    } = updateDto.getValidatedData();

    if (measureUnitId) {
      await this.getMeasureUnitById(measureUnitId);
    }

    if (accountPlanCodeReference) {
      await this.getAccountByCode(accountPlanCodeReference);
    }

    const updatedPlannerPurchaseTask = await prisma.plannerPurchaseTask.update({
      data: {
        name,
        measureUnitId,
        expectedQuantityGoal,
        minimumQuantityGoal,
        accountPlanCodeReference,
        startDate,
        endDate,
        totalBudgetAmount,
      },
      where: {
        id,
      },
    });

    return PlannerPurchaseTaskSummaryEntity.fromJson(updatedPlannerPurchaseTask);
  }

  public async delete(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedPlannerPurchaseTask = await prisma.plannerPurchaseTask.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return PlannerPurchaseTaskSummaryEntity.fromJson(deletedPlannerPurchaseTask);
  }

  // TODO: use functions from correct entities

  private async getMeasureUnitById(id: MeasureUnitSummaryEntity['id']): Promise<MeasureUnitSummaryEntity> {
    const measureUnit = await prisma.measureUnit.findUnique({
      where: {
        id,
        archived: false,
      },
      select: {
        id: true,
        name: true,
        enabled: true,
      },
    });

    if (!measureUnit?.id) {
      throw AppError.notFound(`Unidad de medida con id ${id} no existe`);
    }

    return measureUnit;
  }

  private async getAccountByCode(accountCode: string): Promise<AccountPlanEntity> {
    const year = new Date().getFullYear();

    const accountPlan = await caschileDB<AccountPlanEntity>(
      'select pi.CodigoCuenta, pdc.Descripcion, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
        'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta ' +
        `where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year} and pi.CodigoCuenta = '${accountCode}' ORDER BY pi.CodigoCuenta`,
    );

    const alreadyAccount = accountPlan.recordset[0];

    if (!alreadyAccount?.CodigoCuenta) {
      throw AppError.notFound(`Cuenta con código ${accountCode} no existe`);
    }

    return alreadyAccount;
  }

  private async getPlannerPurchaseById(id: PlannerPurchaseEntity['id']): Promise<PlannerPurchaseEntity> {
    const plannerPurchase = await prisma.plannerPurchase.findUnique({
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerPurchase?.id) {
      throw AppError.notFound(`Planificación de compra con id ${id} no existe`);
    }

    return plannerPurchase;
  }
}
