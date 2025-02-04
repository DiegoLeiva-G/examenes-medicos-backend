import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';
import type { PlannerSpecialHiringEntity } from '../../../plannerSpecialHiring';

export interface GetPlannerHiringTasksByPlannerHiringIdUseCase {
  execute: (
    plannerSpecialHiringId: PlannerSpecialHiringEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>>;
}

export class GetPlannerHiringTasksByPlannerHiringId implements GetPlannerHiringTasksByPlannerHiringIdUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(
    plannerSpecialHiringId: PlannerSpecialHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    return await this.repository.getAllByPlannerHiringId(plannerSpecialHiringId);
  }
}
