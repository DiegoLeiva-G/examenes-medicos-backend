import { type CreateFundingSourceDto } from '../dtos';
import { type FundingSourceSummaryEntity } from '../entities';
import { type FundingSourceRepository } from '../repositories';

export interface CreateFundingSourceUseCase {
  execute: (data: CreateFundingSourceDto) => Promise<FundingSourceSummaryEntity>;
}

export class CreateFundingSource implements CreateFundingSourceUseCase {
  constructor(private readonly repository: FundingSourceRepository) {}

  async execute(data: CreateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    return await this.repository.create(data);
  }
}
