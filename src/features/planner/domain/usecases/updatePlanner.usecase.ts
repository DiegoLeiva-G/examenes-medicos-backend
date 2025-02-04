import { type UpdatePlannerDto } from '../dtos';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';

export interface UpdatePlannerUseCase {
  execute: (data: UpdatePlannerDto) => Promise<PlannerSummaryEntity>;
}

export class UpdatePlanner implements UpdatePlannerUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(data: UpdatePlannerDto): Promise<PlannerSummaryEntity> {
    return await this.repository.updatePlanner(data);
  }
}
