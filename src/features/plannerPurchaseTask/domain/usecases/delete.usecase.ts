import { type GetPlannerPurchaseTaskByIdDto } from '../dtos';
import { type PlannerPurchaseTaskSummaryEntity } from '../entities';
import { type PlannerPurchaseTaskRepository } from '../repositories';

export interface DeletePlannerPurchaseTaskUseCase {
  execute: (getByIdDto: GetPlannerPurchaseTaskByIdDto) => Promise<PlannerPurchaseTaskSummaryEntity>;
}

export class DeletePlannerPurchaseTask implements DeletePlannerPurchaseTaskUseCase {
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  async execute(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
