import { type CreateInvestmentInitiativeDto } from '../dtos';
import { type InvestmentInitiativeEntity } from '../entities';
import { type InvestmentInitiativeRepository } from '../repositories';

export interface CreateInvestmentInitiativeUseCase {
  execute: (data: CreateInvestmentInitiativeDto) => Promise<InvestmentInitiativeEntity>;
}

export class CreateInvestmentInitiative implements CreateInvestmentInitiativeUseCase {
  constructor(private readonly repository: InvestmentInitiativeRepository) {}

  async execute(data: CreateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    return await this.repository.create(data);
  }
}
