import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';
import type { ImprovementProjectEntity } from '../../../improvementProject';

export interface GetPlannersByImprovementProjectIdUseCase {
  execute: (
    investmentInitiativeId: ImprovementProjectEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerSummaryEntity[]>>;
}

export class GetPlannersByImprovementProjectId implements GetPlannersByImprovementProjectIdUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(
    investmentInitiativeId: ImprovementProjectEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    return await this.repository.getAllPlannersByImprovementProjectId(investmentInitiativeId);
  }
}
