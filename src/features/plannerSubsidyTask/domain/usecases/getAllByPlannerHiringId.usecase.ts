import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerSubsidyTaskSummaryEntity } from '../entities';
import { type PlannerSubsidyTaskRepository } from '../repositories';
import type { PlannerSubsidyEntity } from '../../../plannerSubsidy';

export interface GetPlannerSubsidyTasksByPlannerSubsidyIdUseCase {
  execute: (
    investmentInitiativeId: PlannerSubsidyEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>>;
}

export class GetPlannerSubsidyTasksByPlannerSubsidyId implements GetPlannerSubsidyTasksByPlannerSubsidyIdUseCase {
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  async execute(
    investmentInitiativeId: PlannerSubsidyEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>> {
    return await this.repository.getAllByPlannerSubsidyId(investmentInitiativeId);
  }
}
