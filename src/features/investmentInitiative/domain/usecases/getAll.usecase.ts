import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type InvestmentInitiativeEntityToList } from '../entities';
import { type InvestmentInitiativeRepository } from '../repositories';

export interface GetInvestmentInitiativesUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>>;
}

export class GetInvestmentInitiatives implements GetInvestmentInitiativesUseCase {
  constructor(private readonly repository: InvestmentInitiativeRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>> {
    return await this.repository.getAll(pagination);
  }
}
