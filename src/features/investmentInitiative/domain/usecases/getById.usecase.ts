import { type GetInvestmentInitiativeByIdDto } from '../dtos';
import { type InvestmentInitiativeSummaryEntity } from '../entities';
import { type InvestmentInitiativeRepository } from '../repositories';

export interface GetInvestmentInitiativeByIdUseCase {
  execute: (getByIdDto: GetInvestmentInitiativeByIdDto) => Promise<InvestmentInitiativeSummaryEntity>;
}

export class GetInvestmentInitiativeById implements GetInvestmentInitiativeByIdUseCase {
  constructor(private readonly repository: InvestmentInitiativeRepository) {}

  async execute(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeSummaryEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
