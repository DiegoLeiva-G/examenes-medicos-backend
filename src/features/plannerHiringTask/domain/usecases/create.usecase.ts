import { type CreatePlannerHiringTaskDto } from '../dtos';
import { type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';

export interface CreatePlannerHiringTaskUseCase {
  execute: (data: CreatePlannerHiringTaskDto) => Promise<PlannerHiringTaskSummaryEntity>;
}

export class CreatePlannerHiringTask implements CreatePlannerHiringTaskUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(data: CreatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.repository.create(data);
  }
}
