import { type UpdateIncomeBudgetDetailDto } from '../dtos';
import { type IncomeBudgetDetailSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface UpdateIncomeBudgetDetailUseCase {
  execute: (data: UpdateIncomeBudgetDetailDto) => Promise<IncomeBudgetDetailSummaryEntity>;
}

export class UpdateIncomeBudgetDetail implements UpdateIncomeBudgetDetailUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(data: UpdateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.repository.updateIncomeBudgetDetail(data);
  }
}
