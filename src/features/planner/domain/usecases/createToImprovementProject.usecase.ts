import { type CreatePlannerToImprovementProjectDto } from '../dtos';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';

export interface CreatePlannerToImprovementProjectUseCase {
  execute: (data: CreatePlannerToImprovementProjectDto) => Promise<PlannerSummaryEntity>;
}

export class CreatePlannerToImprovementProject implements CreatePlannerToImprovementProjectUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(data: CreatePlannerToImprovementProjectDto): Promise<PlannerSummaryEntity> {
    return await this.repository.createPlannerToImprovementProject(data);
  }
}
