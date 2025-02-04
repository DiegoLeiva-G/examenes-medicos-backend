import { type GetPlannerPurchaseByIdDto } from '../dtos';
import { type PlannerPurchaseSummaryEntity } from '../entities';
import { type PlannerPurchaseRepository } from '../repositories';

export interface GetPlannerPurchaseByIdUseCase {
  execute: (getByIdDto: GetPlannerPurchaseByIdDto) => Promise<PlannerPurchaseSummaryEntity>;
}

export class GetPlannerPurchaseById implements GetPlannerPurchaseByIdUseCase {
  constructor(private readonly repository: PlannerPurchaseRepository) {}

  async execute(getByIdDto: GetPlannerPurchaseByIdDto): Promise<PlannerPurchaseSummaryEntity> {
    return await this.repository.getPlannerPurchaseById(getByIdDto);
  }
}
