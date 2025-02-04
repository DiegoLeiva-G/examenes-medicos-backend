import { type CreatePlannerToInvestmentInitiativeDto } from '../dtos';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';

export interface CreatePlannerToInvestmentInitiativeUseCase {
  execute: (data: CreatePlannerToInvestmentInitiativeDto) => Promise<PlannerSummaryEntity>;
}

export class CreatePlannerToInvestmentInitiative implements CreatePlannerToInvestmentInitiativeUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(data: CreatePlannerToInvestmentInitiativeDto): Promise<PlannerSummaryEntity> {
    return await this.repository.createPlannerToInvestmentInitiative(data);
  }
}
