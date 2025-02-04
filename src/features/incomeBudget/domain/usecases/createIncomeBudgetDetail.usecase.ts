import { type CreateIncomeBudgetDetailDto } from '../dtos';
import { type IncomeBudgetDetailSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface CreateIncomeBudgetDetailUseCase {
  execute: (data: CreateIncomeBudgetDetailDto) => Promise<IncomeBudgetDetailSummaryEntity>;
}

export class CreateIncomeBudgetDetail implements CreateIncomeBudgetDetailUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(data: CreateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.repository.createIncomeBudgetDetail(data);
  }
}
