import { type CreateFundingSourceDto, type GetFundingSourceByIdDto, type UpdateFundingSourceDto } from '../dtos';
import { type FundingSourceSummaryEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export abstract class FundingSourceRepository {
  abstract create(createDto: CreateFundingSourceDto): Promise<FundingSourceSummaryEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<FundingSourceSummaryEntity[]>>;
  abstract getById(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity>;
  abstract update(updateDto: UpdateFundingSourceDto): Promise<FundingSourceSummaryEntity>;
  abstract delete(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity>;
}
