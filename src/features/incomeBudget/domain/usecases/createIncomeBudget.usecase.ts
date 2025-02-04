import { type CreateIncomeBudgetDto } from '../dtos';
import { type IncomeBudgetSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface CreateIncomeBudgetUseCase {
  execute: (data: CreateIncomeBudgetDto) => Promise<IncomeBudgetSummaryEntity>;
}

export class CreateIncomeBudget implements CreateIncomeBudgetUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(data: CreateIncomeBudgetDto): Promise<IncomeBudgetSummaryEntity> {
    return await this.repository.createIncomeBudget(data);
  }
}
