import { type CreatePlannerPurchaseTaskDto } from '../dtos';
import { type PlannerPurchaseTaskSummaryEntity } from '../entities';
import { type PlannerPurchaseTaskRepository } from '../repositories';

export interface CreatePlannerPurchaseTaskUseCase {
  execute: (data: CreatePlannerPurchaseTaskDto) => Promise<PlannerPurchaseTaskSummaryEntity>;
}

export class CreatePlannerPurchaseTask implements CreatePlannerPurchaseTaskUseCase {
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  async execute(data: CreatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.repository.create(data);
  }
}
