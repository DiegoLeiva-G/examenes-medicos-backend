import { type CreatePlannerSubsidyDto } from '../dtos';
import { type PlannerSubsidySummaryEntity } from '../entities';
import { type PlannerSubsidyRepository } from '../repositories';

export interface CreatePlannerSubsidyUseCase {
  execute: (data: CreatePlannerSubsidyDto) => Promise<PlannerSubsidySummaryEntity>;
}

export class CreatePlannerSubsidy implements CreatePlannerSubsidyUseCase {
  constructor(private readonly repository: PlannerSubsidyRepository) {}

  async execute(data: CreatePlannerSubsidyDto): Promise<PlannerSubsidySummaryEntity> {
    return await this.repository.createPlannerSubsidy(data);
  }
}
