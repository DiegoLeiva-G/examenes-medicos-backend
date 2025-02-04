import { type GetPlannerSubsidyTaskByIdDto } from '../dtos';
import { type PlannerSubsidyTaskSummaryEntity } from '../entities';
import { type PlannerSubsidyTaskRepository } from '../repositories';

export interface DeletePlannerSubsidyTaskUseCase {
  execute: (getByIdDto: GetPlannerSubsidyTaskByIdDto) => Promise<PlannerSubsidyTaskSummaryEntity>;
}

export class DeletePlannerSubsidyTask implements DeletePlannerSubsidyTaskUseCase {
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  async execute(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
