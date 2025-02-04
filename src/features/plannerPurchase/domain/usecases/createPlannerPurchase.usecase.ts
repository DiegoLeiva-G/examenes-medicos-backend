import { type CreatePlannerPurchaseDto } from '../dtos';
import { type PlannerPurchaseSummaryEntity } from '../entities';
import { type PlannerPurchaseRepository } from '../repositories';

export interface CreatePlannerPurchaseUseCase {
  execute: (data: CreatePlannerPurchaseDto) => Promise<PlannerPurchaseSummaryEntity>;
}

export class CreatePlannerPurchase implements CreatePlannerPurchaseUseCase {
  constructor(private readonly repository: PlannerPurchaseRepository) {}

  async execute(data: CreatePlannerPurchaseDto): Promise<PlannerPurchaseSummaryEntity> {
    return await this.repository.createPlannerPurchase(data);
  }
}
