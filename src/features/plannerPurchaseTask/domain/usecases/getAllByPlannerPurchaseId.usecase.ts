import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerPurchaseTaskSummaryEntity } from '../entities';
import { type PlannerPurchaseTaskRepository } from '../repositories';
import type { PlannerPurchaseEntity } from '../../../plannerPurchase';

export interface GetPlannerPurchaseTasksByPlannerPurchaseIdUseCase {
  execute: (
    investmentInitiativeId: PlannerPurchaseEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>>;
}

export class GetPlannerPurchaseTasksByPlannerPurchaseId implements GetPlannerPurchaseTasksByPlannerPurchaseIdUseCase {
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  async execute(
    investmentInitiativeId: PlannerPurchaseEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>> {
    return await this.repository.getAllByPlannerPurchaseId(investmentInitiativeId);
  }
}
