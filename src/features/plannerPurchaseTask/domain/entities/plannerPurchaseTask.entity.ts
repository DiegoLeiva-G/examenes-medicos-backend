import { type PlannerPurchaseTask } from '@prisma/client';
import { AppError } from '../../../../core';
import { type MeasureUnitSummaryEntity } from '../../../measureUnit';
import { type AccountPlanEntity } from '../../../accountPlan';

interface IPlannerPurchaseTaskExtended extends Omit<PlannerPurchaseTask, 'approvedBudget' | 'totalBudgetAmount'> {
  totalBudgetAmount: number;
  approvedBudget: number;
}

export class PlannerPurchaseTaskEntity implements IPlannerPurchaseTaskExtended {
  constructor(
    public id: PlannerPurchaseTask['id'],
    public name: PlannerPurchaseTask['name'],
    public expectedQuantityGoal: PlannerPurchaseTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerPurchaseTask['minimumQuantityGoal'],
    public startDate: PlannerPurchaseTask['startDate'],
    public endDate: PlannerPurchaseTask['endDate'],
    public accountPlanCodeReference: PlannerPurchaseTask['accountPlanCodeReference'],
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public status: PlannerPurchaseTask['status'],
    public measureUnitId: PlannerPurchaseTask['measureUnitId'],
    public plannerPurchaseId: PlannerPurchaseTask['plannerPurchaseId'],
    public archived: PlannerPurchaseTask['archived'],
    public createdAt: PlannerPurchaseTask['createdAt'],
    public updatedAt: PlannerPurchaseTask['updatedAt'],
  ) {}

  public static fromJson(obj: PlannerPurchaseTaskEntity): PlannerPurchaseTaskEntity {
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
      measureUnitId,
      plannerPurchaseId,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerPurchaseTaskEntity(
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
      measureUnitId,
      plannerPurchaseId,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class PlannerPurchaseTaskExtendedEntity
  implements
    Omit<
      PlannerPurchaseTaskEntity,
      'accountPlanCodeReference' | 'measureUnitId' | 'plannerPurchaseId' | 'archived' | 'updatedAt' | 'status'
    >
{
  constructor(
    public id: PlannerPurchaseTask['id'],
    public name: PlannerPurchaseTask['name'],
    public expectedQuantityGoal: PlannerPurchaseTask['expectedQuantityGoal'],
    public minimumQuantityGoal: PlannerPurchaseTask['minimumQuantityGoal'],
    public startDate: PlannerPurchaseTask['startDate'],
    public endDate: PlannerPurchaseTask['endDate'],
    public accountPlanCode: AccountPlanEntity,
    public totalBudgetAmount: number,
    public approvedBudget: number,
    public measureUnit: MeasureUnitSummaryEntity,
    public createdAt: PlannerPurchaseTask['createdAt'],
  ) {}

  public static fromJson(obj: PlannerPurchaseTaskExtendedEntity): PlannerPurchaseTaskExtendedEntity {
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
      measureUnit,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerPurchaseTaskExtendedEntity(
      id,
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      startDate,
      endDate,
      accountPlanCode,
      totalBudgetAmount,
      approvedBudget,
      measureUnit,
      createdAt,
    );
  }
}

export class PlannerPurchaseTaskSummaryEntity
  implements Pick<PlannerPurchaseTaskEntity, 'id' | 'name' | 'startDate' | 'endDate'>
{
  constructor(
    public id: PlannerPurchaseTask['id'],
    public name: PlannerPurchaseTask['name'],
    public startDate: PlannerPurchaseTask['startDate'],
    public endDate: PlannerPurchaseTask['endDate'],
  ) {}

  public static fromJson(obj: PlannerPurchaseTaskSummaryEntity): PlannerPurchaseTaskSummaryEntity {
    const { id, name, startDate, endDate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerPurchaseTaskSummaryEntity(id, name, startDate, endDate);
  }
}
