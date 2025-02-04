import { type PlannerSubsidyTask } from '@prisma/client';
import { AppError } from '../../../../core';
import { type AccountPlanEntity } from '../../../accountPlan';

interface IPlannerSubsidyTaskExtended extends Omit<PlannerSubsidyTask, 'approvedBudget' | 'totalBudgetAmount'> {
  totalBudgetAmount: number;
  approvedBudget: number;
}

export class PlannerSubsidyTaskEntity implements IPlannerSubsidyTaskExtended {
  constructor(
    public id: PlannerSubsidyTask['id'],
    public name: PlannerSubsidyTask['name'],
    public expectedQuantityGoal: PlannerSubsidyTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerSubsidyTask['minimumQuantityGoal'],
    public startDate: PlannerSubsidyTask['startDate'],
    public endDate: PlannerSubsidyTask['endDate'],
    public accountPlanCodeReference: PlannerSubsidyTask['accountPlanCodeReference'],
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public status: PlannerSubsidyTask['status'],
    public plannerSubsidyId: PlannerSubsidyTask['plannerSubsidyId'],
    public archived: PlannerSubsidyTask['archived'],
    public createdAt: PlannerSubsidyTask['createdAt'],
    public updatedAt: PlannerSubsidyTask['updatedAt'],
  ) {}

  public static fromJson(obj: PlannerSubsidyTaskEntity): PlannerSubsidyTaskEntity {
    const {
      id,
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      startDate,
      endDate,
      accountPlanCodeReference,
      totalBudgetAmount,
      approvedBudget,
      status,
      plannerSubsidyId,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSubsidyTaskEntity(
      id,
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      startDate,
      endDate,
      accountPlanCodeReference,
      totalBudgetAmount,
      approvedBudget,
      status,
      plannerSubsidyId,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class PlannerSubsidyTaskExtendedEntity
  implements
    Omit<
      PlannerSubsidyTaskEntity,
      'accountPlanCodeReference' | 'plannerSubsidyId' | 'archived' | 'updatedAt' | 'status'
    >
{
  constructor(
    public id: PlannerSubsidyTask['id'],
    public name: PlannerSubsidyTask['name'],
    public expectedQuantityGoal: PlannerSubsidyTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerSubsidyTask['minimumQuantityGoal'],
    public startDate: PlannerSubsidyTask['startDate'],
    public endDate: PlannerSubsidyTask['endDate'],
    public accountPlanCode: AccountPlanEntity,
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public createdAt: PlannerSubsidyTask['createdAt'],
  ) {}

  public static fromJson(obj: PlannerSubsidyTaskExtendedEntity): PlannerSubsidyTaskExtendedEntity {
    const {
      id,
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      startDate,
      endDate,
      accountPlanCode,
      totalBudgetAmount,
      approvedBudget,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSubsidyTaskExtendedEntity(
      id,
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      startDate,
      endDate,
      accountPlanCode,
      totalBudgetAmount,
      approvedBudget,
      createdAt,
    );
  }
}

export class PlannerSubsidyTaskSummaryEntity
  implements Pick<PlannerSubsidyTaskEntity, 'id' | 'name' | 'startDate' | 'endDate'>
{
  constructor(
    public id: PlannerSubsidyTask['id'],
    public name: PlannerSubsidyTask['name'],
    public startDate: PlannerSubsidyTask['startDate'],
    public endDate: PlannerSubsidyTask['endDate'],
  ) {}

  public static fromJson(obj: PlannerSubsidyTaskSummaryEntity): PlannerSubsidyTaskSummaryEntity {
    const { id, name, startDate, endDate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSubsidyTaskSummaryEntity(id, name, startDate, endDate);
  }
}
