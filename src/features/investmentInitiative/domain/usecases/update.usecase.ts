import { type UpdateInvestmentInitiativeDto } from '../dtos';
import { type InvestmentInitiativeEntity } from '../entities';
import { type InvestmentInitiativeRepository } from '../repositories';

export interface UpdateInvestmentInitiativeUseCase {
  execute: (data: UpdateInvestmentInitiativeDto) => Promise<InvestmentInitiativeEntity>;
}

export class UpdateInvestmentInitiative implements UpdateInvestmentInitiativeUseCase {
  constructor(private readonly repository: InvestmentInitiativeRepository) {}

  async execute(data: UpdateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    return await this.repository.update(data);
  }
}
