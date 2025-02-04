import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';
import type { InvestmentInitiativeEntity } from '../../../investmentInitiative';

export interface GetPlannersByInvestmentInitiativeIdUseCase {
  execute: (
    investmentInitiativeId: InvestmentInitiativeEntity['id'],
  ) => Promise<PaginationResponseEntity<PlannerSummaryEntity[]>>;
}

export class GetPlannersByInvestmentInitiativeId implements GetPlannersByInvestmentInitiativeIdUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(
    investmentInitiativeId: InvestmentInitiativeEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    return await this.repository.getAllPlannersByInvestmentInitiativeId(investmentInitiativeId);
  }
}
