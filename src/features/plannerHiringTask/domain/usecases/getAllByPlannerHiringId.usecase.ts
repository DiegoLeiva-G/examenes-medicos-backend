import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';
import type { PlannerHiringEntity } from '../../../plannerHiring';

export interface GetPlannerHiringTasksByPlannerHiringIdUseCase {
  execute: (
    plannerHiringId: PlannerHiringEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>>;
}

export class GetPlannerHiringTasksByPlannerHiringId implements GetPlannerHiringTasksByPlannerHiringIdUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(
    plannerHiringId: PlannerHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    return await this.repository.getAllByPlannerHiringId(plannerHiringId);
  }
}
