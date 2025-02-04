import { type UpdatePlannerPurchaseTaskDto } from '../dtos';
import { type PlannerPurchaseTaskSummaryEntity } from '../entities';
import { type PlannerPurchaseTaskRepository } from '../repositories';

export interface UpdatePlannerPurchaseTaskUseCase {
  execute: (data: UpdatePlannerPurchaseTaskDto) => Promise<PlannerPurchaseTaskSummaryEntity>;
}

export class UpdatePlannerPurchaseTask implements UpdatePlannerPurchaseTaskUseCase {
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  async execute(data: UpdatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.repository.update(data);
  }
}
