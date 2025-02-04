import { PlannerTaskStatus, type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreatePlannerHiringTaskDto,
  type GetPlannerHiringTaskByIdDto,
  type PlannerHiringTaskDatasource,
  PlannerHiringTaskExtendedEntity,
  PlannerHiringTaskSummaryEntity,
  type UpdatePlannerHiringTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerHiringEntity } from '../../plannerHiring';
import { type AccountPlanEntity } from '../../accountPlan';
import { caschileDB } from '../../../core/mssqlClient';
import { type PlannerSpecialHiringEntity } from '../../plannerSpecialHiring';

export class PlannerHiringTaskDatasourceImpl implements PlannerHiringTaskDatasource {
  public async getAllByPlannerHiringId(
    plannerHiringId: PlannerHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    if (!plannerHiringId) {
      throw AppError.badRequest('Error validar las tareas de contratación de honorarios', [
        { field: 'plannerHiringId', constraint: 'plannerHiringId is required' },
      ]);
    }

    await this.getPlannerHiringById(plannerHiringId);

    const where: Prisma.PlannerHiringTaskWhereInput = {
      plannerHiringId,
      archived: false,
    };

    const [totalPlannerHiringTasks, plannerHiringTasks] = await prisma.$transaction([
      prisma.plannerHiringTask.count({ where }),
      prisma.plannerHiringTask.findMany({
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
      results: plannerHiringTasks.map(plannerHiringTask => PlannerHiringTaskSummaryEntity.fromJson(plannerHiringTask)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerHiringTasks,
      totalPages,
    };
  }

  public async getAllByPlannerSpecialHiringId(
    plannerSpecialHiringId: PlannerSpecialHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    if (!plannerSpecialHiringId) {
      throw AppError.badRequest('Error validar las tareas de contratación de honorarios a suma alzada', [
        { field: 'plannerSpecialHiringId', constraint: 'plannerSpecialHiringId is required' },
      ]);
    }

    await this.getPlannerSpecialHiringById(plannerSpecialHiringId);

    const where: Prisma.PlannerHiringTaskWhereInput = {
      plannerSpecialHiringId,
      archived: false,
    };

    const [totalPlannerHiringTasks, plannerHiringTasks] = await prisma.$transaction([
      prisma.plannerHiringTask.count({ where }),
      prisma.plannerHiringTask.findMany({
        select: {
          id: true,
          name: true,
        },
        where,
      }),
    ]);

    const page = 1;
    const totalPages = 1;

    return {
      results: plannerHiringTasks.map(plannerHiringTask => PlannerHiringTaskSummaryEntity.fromJson(plannerHiringTask)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPlannerHiringTasks,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskExtendedEntity> {
    const { id } = getByIdDto.data;

    const plannerHiringTask = await prisma.plannerHiringTask.findUnique({
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

    if (!plannerHiringTask?.id) {
      throw AppError.notFound(`Tarea de contratación de honorarios con id ${id} no existe`);
    }

    const accountPlanCode = await this.getAccountByCode(plannerHiringTask.accountPlanCodeReference);

    return PlannerHiringTaskExtendedEntity.fromJson({
      ...plannerHiringTask,
      approvedBudget: Number(plannerHiringTask.approvedBudget),
      totalBudgetAmount: Number(plannerHiringTask.totalBudgetAmount),
      accountPlanCode,
    });
  }

  public async create(createDto: CreatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      plannerHiringId,
      plannerSpecialHiringId,
      accountPlanCodeReference,
      totalBudgetAmount,
      startDate,
      endDate,
    } = createDto.getValidatedData();

    await this.getAccountByCode(accountPlanCodeReference);

    if (plannerHiringId) {
      await this.getPlannerHiringById(plannerHiringId);
    }

    if (plannerSpecialHiringId) {
      await this.getPlannerSpecialHiringById(plannerSpecialHiringId);
    }

    const createdPlannerHiringTask = await prisma.plannerHiringTask.create({
      data: {
        name,
        expectedQuantityGoal,
        minimumQuantityGoal,
        accountPlanCodeReference,
        startDate,
        endDate,
        totalBudgetAmount,
        ...(plannerHiringId ? { plannerHiring: { connect: { id: plannerHiringId } } } : {}),
        ...(plannerSpecialHiringId ? { plannerSpecialHiring: { connect: { id: plannerSpecialHiringId } } } : {}),
        status: PlannerTaskStatus.NotInitialized,
      },
    });

    return PlannerHiringTaskSummaryEntity.fromJson(createdPlannerHiringTask);
  }

  public async update(updateDto: UpdatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
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

    const updatedPlannerHiringTask = await prisma.plannerHiringTask.update({
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

    return PlannerHiringTaskSummaryEntity.fromJson(updatedPlannerHiringTask);
  }

  public async delete(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskSummaryEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedPlannerHiringTask = await prisma.plannerHiringTask.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return PlannerHiringTaskSummaryEntity.fromJson(deletedPlannerHiringTask);
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

  private async getPlannerHiringById(id: PlannerHiringEntity['id']): Promise<PlannerHiringEntity> {
    const plannerHiring = await prisma.plannerHiring.findUnique({
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerHiring?.id) {
      throw AppError.notFound(`Planificación de contratación de honorarios con id ${id} no existe`);
    }

    return plannerHiring;
  }

  private async getPlannerSpecialHiringById(id: PlannerSpecialHiringEntity['id']): Promise<PlannerSpecialHiringEntity> {
    const plannerSpecialHiring = await prisma.plannerSpecialHiring.findUnique({
      where: {
        id,
        archived: false,
      },
    });

    if (!plannerSpecialHiring?.id) {
      throw AppError.notFound(`Planificación de contratación de honorarios con id ${id} no existe`);
    }

    return plannerSpecialHiring;
  }
}
