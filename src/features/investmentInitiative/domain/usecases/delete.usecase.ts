import { type GetInvestmentInitiativeByIdDto } from '../dtos';
import { type InvestmentInitiativeEntity } from '../entities';
import { type InvestmentInitiativeRepository } from '../repositories';

export interface DeleteInvestmentInitiativeUseCase {
  execute: (getByIdDto: GetInvestmentInitiativeByIdDto) => Promise<InvestmentInitiativeEntity>;
}

export class DeleteInvestmentInitiative implements DeleteInvestmentInitiativeUseCase {
  constructor(private readonly repository: InvestmentInitiativeRepository) {}

  async execute(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
