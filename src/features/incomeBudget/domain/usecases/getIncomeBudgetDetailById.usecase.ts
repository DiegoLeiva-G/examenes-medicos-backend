import { type GetIncomeBudgetDetailByIdDto } from '../dtos';
import { type IncomeBudgetDetailSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface GetIncomeBudgetDetailByIdUseCase {
  execute: (getByIdDto: GetIncomeBudgetDetailByIdDto) => Promise<IncomeBudgetDetailSummaryEntity>;
}

export class GetIncomeBudgetDetailById implements GetIncomeBudgetDetailByIdUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(getByIdDto: GetIncomeBudgetDetailByIdDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.repository.getIncomeBudgetDetailById(getByIdDto);
  }
}
