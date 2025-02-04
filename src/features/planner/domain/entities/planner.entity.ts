import { type Planner } from '@prisma/client';
import { AppError } from '../../../../core';
import { type InvestmentInitiativeToPlannerEntity } from '../../../investmentInitiative';
import { type ImprovementProjectToPlannerEntity } from '../../../improvementProject';
import { type PlannerPurchaseEntity } from '../../../plannerPurchase';
import { type PlannerHiringEntity } from '../../../plannerHiring';
import { type PlannerSubsidyEntity } from '../../../plannerSubsidy';
import { type PlannerSpecialHiringEntity } from '../../../plannerSpecialHiring';
import { type PlannerCouncilorSalaryEntity } from '../../../plannerCouncilorSalary';

interface IPlannerExtended extends Planner {}

export class PlannerEntity implements IPlannerExtended {
  constructor(
    public id: Planner['id'],
    public name: Planner['name'],
    public year: Planner['year'],
    public startDate: Planner['startDate'],
    public endDate: Planner['endDate'],
    public investmentInitiativeId: Planner['investmentInitiativeId'],
    public improvementProjectId: Planner['improvementProjectId'],
    public enabled: Planner['enabled'],
    public archived: Planner['archived'],
    public createdAt: Planner['createdAt'],
    public updatedAt: Planner['updatedAt'],
  ) {}

  public static fromJson(obj: PlannerEntity): PlannerEntity {
    const {
      id,
      name,
      year,
      startDate,
      endDate,
      investmentInitiativeId,
      improvementProjectId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerEntity(
      id,
      name,
      year,
      startDate,
      endDate,
      investmentInitiativeId,
      improvementProjectId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

// TODO: add next planners
export class PlannerSummaryEntity implements Pick<PlannerEntity, 'id' | 'name' | 'year'> {
  constructor(
    public id: Planner['id'],
    public name: Planner['name'],
    public year: Planner['year'],
    public investmentInitiative?: InvestmentInitiativeToPlannerEntity | null,
    public improvementProject?: ImprovementProjectToPlannerEntity | null,
    public plannerPurchase?: {
      id: PlannerPurchaseEntity['id'];
    } | null,
    public plannerHiring?: {
      id: PlannerHiringEntity['id'];
    } | null,
    public plannerSpecialHiring?: {
      id: PlannerSpecialHiringEntity['id'];
      status: PlannerSpecialHiringEntity['status'];
    } | null,
    public plannerSubsidy?: {
      id: PlannerSubsidyEntity['id'];
    } | null,
    public plannerCouncilorSalary?: {
      id: PlannerCouncilorSalaryEntity['id'];
    } | null,
    public plannerOperational?: {
      id: string;
    } | null,
  ) {}

  public static fromJson(obj: PlannerSummaryEntity): PlannerSummaryEntity {
    const {
      id,
      name,
      year,
      investmentInitiative,
      improvementProject,
      plannerPurchase,
      plannerHiring,
      plannerSpecialHiring,
      plannerSubsidy,
      plannerCouncilorSalary,
      plannerOperational,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSummaryEntity(
      id,
      name,
      year,
      investmentInitiative,
      improvementProject,
      plannerPurchase,
      plannerHiring,
      plannerSpecialHiring,
      plannerSubsidy,
      plannerCouncilorSalary,
      plannerOperational,
    );
  }
}
