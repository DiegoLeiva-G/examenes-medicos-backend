import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type IncomeBudgetSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface GetIncomeBudgetsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>>;
}

export class GetIncomeBudgets implements GetIncomeBudgetsUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>> {
    return await this.repository.getAllIncomeBudgets(pagination);
  }
}
