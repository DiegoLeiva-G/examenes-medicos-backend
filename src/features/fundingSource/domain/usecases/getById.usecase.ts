import { type GetFundingSourceByIdDto } from '../dtos';
import { type FundingSourceSummaryEntity } from '../entities';
import { type FundingSourceRepository } from '../repositories';

export interface GetFundingSourceByIdUseCase {
  execute: (getByIdDto: GetFundingSourceByIdDto) => Promise<FundingSourceSummaryEntity>;
}

export class GetFundingSourceById implements GetFundingSourceByIdUseCase {
  constructor(private readonly repository: FundingSourceRepository) {}

  async execute(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
