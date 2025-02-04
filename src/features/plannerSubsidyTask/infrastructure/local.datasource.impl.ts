import { PlannerTaskStatus, type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreatePlannerSubsidyTaskDto,
  type GetPlannerSubsidyTaskByIdDto,
  type PlannerSubsidyTaskDatasource,
  PlannerSubsidyTaskExtendedEntity,
  PlannerSubsidyTaskSummaryEntity,
  type UpdatePlannerSubsidyTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerSubsidyEntity } from '../../plannerSubsidy';
import { type AccountPlanEntity } from '../../accountPlan';
import { caschileDB } from '../../../core/mssqlClient';

export class PlannerSubsidyTaskDatasourceImpl implements PlannerSubsidyTaskDatasource {
  public async getAllByPlannerSubsidyId(
    plannerSubsidyId: PlannerSubsidyEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>> {
    if (!plannerSubsidyId) {
      throw AppError.badRequest('Error validar las tareas de transferencias y subvenciones', [
        { field: 'plannerSubsidyId', constraint: 'plannerSubsidyId is required' },
      ]);
    }

    await this.getPlannerSubsidyById(plannerSubsidyId);

    const where: Prisma.PlannerSubsidyTaskWhereInput = {
      plannerSubsidyId,
      archived: false,
    };

    const [totalPlannerSubsidyTasks, plannerSubsidyTasks] = await prisma.$transaction([
      prisma.plannerSubsidyTask.count({ where }),
      prisma.plannerSubsidyTask.findMany({
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
      results: plannerSubsidyTasks.map(plannerSubsidyTask =>
        PlannerSubsidyTaskSummaryEntity.fromJson(plannerSubsidyTask),
      ),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerSubsidyTasks,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskExtendedEntity> {
    const { id } = getByIdDto.data;

    const plannerSubsidyTask = await prisma.plannerSubsidyTask.findUnique({
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
        createdAt: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerSubsidyTask?.id) {
      throw AppError.notFound(`Tarea de transferencias y subvenciones con id ${id} no existe`);
    }

    const accountPlanCode = await this.getAccountByCode(plannerSubsidyTask.accountPlanCodeReference);

    return PlannerSubsidyTaskExtendedEntity.fromJson({
      ...plannerSubsidyTask,
      approvedBudget: Number(plannerSubsidyTask.approvedBudget),
      totalBudgetAmount: Number(plannerSubsidyTask.totalBudgetAmount),
      accountPlanCode,
    });
  }

  public async create(createDto: CreatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      plannerSubsidyId,
      accountPlanCodeReference,
      totalBudgetAmount,
      startDate,
      endDate,
    } = createDto.getValidatedData();

    await this.getAccountByCode(accountPlanCodeReference);

    if (plannerSubsidyId) {
      await this.getPlannerSubsidyById(plannerSubsidyId);
    }

    const createdPlannerSubsidyTask = await prisma.plannerSubsidyTask.create({
      data: {
        name,
        expectedQuantityGoal,
        minimumQuantityGoal,
        accountPlanCodeReference,
        startDate,
        endDate,
        totalBudgetAmount,
        ...(plannerSubsidyId ? { plannerSubsidy: { connect: { id: plannerSubsidyId } } } : {}),
        status: PlannerTaskStatus.NotInitialized,
      },
    });

    return PlannerSubsidyTaskSummaryEntity.fromJson(createdPlannerSubsidyTask);
  }

  public async update(updateDto: UpdatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    const { id } = await this.getById(updateDto);
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
    } = updateDto.getValidatedData();

    if (accountPlanCodeReference) {
      await this.getAccountByCode(accountPlanCodeReference);
    }

    const updatedPlannerSubsidyTask = await prisma.plannerSubsidyTask.update({
      data: {
        name,
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

    return PlannerSubsidyTaskSummaryEntity.fromJson(updatedPlannerSubsidyTask);
  }

  public async delete(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedPlannerSubsidyTask = await prisma.plannerSubsidyTask.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return PlannerSubsidyTaskSummaryEntity.fromJson(deletedPlannerSubsidyTask);
  }

  // TODO: use functions from correct entities

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

  private async getPlannerSubsidyById(id: PlannerSubsidyEntity['id']): Promise<PlannerSubsidyEntity> {
    const plannerSubsidy = await prisma.plannerSubsidy.findUnique({
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerSubsidy?.id) {
      throw AppError.notFound(`Planificación de transferencias y subvenciones con id ${id} no existe`);
    }

    return plannerSubsidy;
  }
}
