import { type GetIncomeBudgetByIdDto } from '../dtos';
import { type IncomeBudgetSummaryEntity } from '../entities';
import { type IncomeBudgetRepository } from '../repositories';

export interface GetIncomeBudgetByIdUseCase {
  execute: (getByIdDto: GetIncomeBudgetByIdDto) => Promise<IncomeBudgetSummaryEntity>;
}

export class GetIncomeBudgetById implements GetIncomeBudgetByIdUseCase {
  constructor(private readonly repository: IncomeBudgetRepository) {}

  async execute(getByIdDto: GetIncomeBudgetByIdDto): Promise<IncomeBudgetSummaryEntity> {
    return await this.repository.getIncomeBudgetById(getByIdDto);
  }
}
