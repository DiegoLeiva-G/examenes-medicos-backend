import { type UpdatePlannerHiringTaskDto } from '../dtos';
import { type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';

export interface UpdatePlannerHiringTaskUseCase {
  execute: (data: UpdatePlannerHiringTaskDto) => Promise<PlannerHiringTaskSummaryEntity>;
}

export class UpdatePlannerHiringTask implements UpdatePlannerHiringTaskUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(data: UpdatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.repository.update(data);
  }
}
