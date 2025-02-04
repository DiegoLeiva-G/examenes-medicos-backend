import { type GetIncomeBudgetDetailByIdDto } from '../dtos';
import { type IncomeBudgetDetailSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface DeleteIncomeBudgetDetailUseCase {
  execute: (getByIdDto: GetIncomeBudgetDetailByIdDto) => Promise<IncomeBudgetDetailSummaryEntity>;
}

export class DeleteIncomeBudgetDetail implements DeleteIncomeBudgetDetailUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(getByIdDto: GetIncomeBudgetDetailByIdDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.repository.deleteIncomeBudgetDetailById(getByIdDto);
  }
}
