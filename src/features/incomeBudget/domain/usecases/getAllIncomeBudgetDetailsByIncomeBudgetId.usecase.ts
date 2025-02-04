import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type IncomeBudgetDetailSummaryEntity, type IncomeBudgetSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface GetIncomeBudgetDetailsByIncomeBudgetIdUseCase {
  execute: (
    pagination: PaginationDto,
    incomeBudgetId: IncomeBudgetSummaryEntity['id'],
  ) => Promise<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>>;
}

export class GetIncomeBudgetDetailsByIncomeBudgetId implements GetIncomeBudgetDetailsByIncomeBudgetIdUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(
    pagination: PaginationDto,
    incomeBudgetId: IncomeBudgetSummaryEntity['id'],
  ): Promise<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>> {
    return await this.repository.getAllIncomeBudgetDetailsByIncomeBudgetId(pagination, incomeBudgetId);
  }
}
