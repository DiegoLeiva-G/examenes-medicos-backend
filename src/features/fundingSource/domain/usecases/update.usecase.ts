import { type UpdateFundingSourceDto } from '../dtos';
import { type FundingSourceSummaryEntity } from '../entities';
import { type FundingSourceRepository } from '../repositories';

export interface UpdateFundingSourceUseCase {
  execute: (data: UpdateFundingSourceDto) => Promise<FundingSourceSummaryEntity>;
}

export class UpdateFundingSource implements UpdateFundingSourceUseCase {
  constructor(private readonly repository: FundingSourceRepository) {}

  async execute(data: UpdateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    return await this.repository.update(data);
  }
}
