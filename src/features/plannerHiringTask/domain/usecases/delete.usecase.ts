import { type GetPlannerHiringTaskByIdDto } from '../dtos';
import { type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';

export interface DeletePlannerHiringTaskUseCase {
  execute: (getByIdDto: GetPlannerHiringTaskByIdDto) => Promise<PlannerHiringTaskSummaryEntity>;
}

export class DeletePlannerHiringTask implements DeletePlannerHiringTaskUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
