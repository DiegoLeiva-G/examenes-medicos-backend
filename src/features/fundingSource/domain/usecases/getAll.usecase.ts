import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type FundingSourceSummaryEntity } from '../entities';
import { type FundingSourceRepository } from '../repositories';

export interface GetFundingSourcesUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<FundingSourceSummaryEntity[]>>;
}

export class GetFundingSources implements GetFundingSourcesUseCase {
  constructor(private readonly repository: FundingSourceRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<FundingSourceSummaryEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
