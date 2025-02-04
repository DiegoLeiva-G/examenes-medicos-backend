import { type GetFundingSourceByIdDto } from '../dtos';
import { type FundingSourceSummaryEntity } from '../entities';
import { type FundingSourceRepository } from '../repositories';

export interface DeleteFundingSourceUseCase {
  execute: (getByIdDto: GetFundingSourceByIdDto) => Promise<FundingSourceSummaryEntity>;
}

export class DeleteFundingSource implements DeleteFundingSourceUseCase {
  constructor(private readonly repository: FundingSourceRepository) {}

  async execute(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
