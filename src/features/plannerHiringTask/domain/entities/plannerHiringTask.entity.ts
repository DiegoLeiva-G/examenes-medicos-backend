import { type PlannerHiringTask } from '@prisma/client';
import { AppError } from '../../../../core';
import { type AccountPlanEntity } from '../../../accountPlan';

interface IPlannerHiringTaskExtended extends Omit<PlannerHiringTask, 'approvedBudget' | 'totalBudgetAmount'> {
  totalBudgetAmount: number;
  approvedBudget: number;
}

export class PlannerHiringTaskEntity implements IPlannerHiringTaskExtended {
  constructor(
    public id: PlannerHiringTask['id'],
    public name: PlannerHiringTask['name'],
    public expectedQuantityGoal: PlannerHiringTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerHiringTask['minimumQuantityGoal'],
    public startDate: PlannerHiringTask['startDate'],
    public endDate: PlannerHiringTask['endDate'],
    public accountPlanCodeReference: PlannerHiringTask['accountPlanCodeReference'],
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public status: PlannerHiringTask['status'],
    public plannerHiringId: PlannerHiringTask['plannerHiringId'],
    public plannerSpecialHiringId: PlannerHiringTask['plannerSpecialHiringId'],
    public archived: PlannerHiringTask['archived'],
    public createdAt: PlannerHiringTask['createdAt'],
    public updatedAt: PlannerHiringTask['updatedAt'],
  ) {}

  public static fromJson(obj: PlannerHiringTaskEntity): PlannerHiringTaskEntity {
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
      plannerHiringId,
      plannerSpecialHiringId,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerHiringTaskEntity(
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
      plannerHiringId,
      plannerSpecialHiringId,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class PlannerHiringTaskExtendedEntity
  implements
    Omit<
      PlannerHiringTaskEntity,
      'accountPlanCodeReference' | 'plannerHiringId' | 'plannerSpecialHiringId' | 'archived' | 'updatedAt' | 'status'
    >
{
  constructor(
    public id: PlannerHiringTask['id'],
    public name: PlannerHiringTask['name'],
    public expectedQuantityGoal: PlannerHiringTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerHiringTask['minimumQuantityGoal'],
    public startDate: PlannerHiringTask['startDate'],
    public endDate: PlannerHiringTask['endDate'],
    public accountPlanCode: AccountPlanEntity,
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public createdAt: PlannerHiringTask['createdAt'],
  ) {}

  public static fromJson(obj: PlannerHiringTaskExtendedEntity): PlannerHiringTaskExtendedEntity {
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

    return new PlannerHiringTaskExtendedEntity(
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

export class PlannerHiringTaskSummaryEntity
  implements Pick<PlannerHiringTaskEntity, 'id' | 'name' | 'startDate' | 'endDate'>
{
  constructor(
    public id: PlannerHiringTask['id'],
    public name: PlannerHiringTask['name'],
    public startDate: PlannerHiringTask['startDate'],
    public endDate: PlannerHiringTask['endDate'],
  ) {}

  public static fromJson(obj: PlannerHiringTaskSummaryEntity): PlannerHiringTaskSummaryEntity {
    const { id, name, startDate, endDate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerHiringTaskSummaryEntity(id, name, startDate, endDate);
  }
}
