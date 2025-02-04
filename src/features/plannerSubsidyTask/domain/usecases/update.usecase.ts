import { type UpdatePlannerSubsidyTaskDto } from '../dtos';
import { type PlannerSubsidyTaskSummaryEntity } from '../entities';
import { type PlannerSubsidyTaskRepository } from '../repositories';

export interface UpdatePlannerSubsidyTaskUseCase {
  execute: (data: UpdatePlannerSubsidyTaskDto) => Promise<PlannerSubsidyTaskSummaryEntity>;
}

export class UpdatePlannerSubsidyTask implements UpdatePlannerSubsidyTaskUseCase {
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  async execute(data: UpdatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.repository.update(data);
  }
}
