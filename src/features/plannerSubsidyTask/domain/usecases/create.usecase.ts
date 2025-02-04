import { type CreatePlannerSubsidyTaskDto } from '../dtos';
import { type PlannerSubsidyTaskSummaryEntity } from '../entities';
import { type PlannerSubsidyTaskRepository } from '../repositories';

export interface CreatePlannerSubsidyTaskUseCase {
  execute: (data: CreatePlannerSubsidyTaskDto) => Promise<PlannerSubsidyTaskSummaryEntity>;
}

export class CreatePlannerSubsidyTask implements CreatePlannerSubsidyTaskUseCase {
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  async execute(data: CreatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.repository.create(data);
  }
}
