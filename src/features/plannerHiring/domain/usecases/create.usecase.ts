import { type CreatePlannerHiringDto } from '../dtos';
import { type PlannerHiringSummaryEntity } from '../entities';
import { type PlannerHiringRepository } from '../repositories';

export interface CreatePlannerHiringUseCase {
  execute: (data: CreatePlannerHiringDto) => Promise<PlannerHiringSummaryEntity>;
}

export class CreatePlannerHiring implements CreatePlannerHiringUseCase {
  constructor(private readonly repository: PlannerHiringRepository) {}

  async execute(data: CreatePlannerHiringDto): Promise<PlannerHiringSummaryEntity> {
    return await this.repository.createPlannerHiring(data);
  }
}
