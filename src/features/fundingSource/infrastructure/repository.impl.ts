import {
  type CreateFundingSourceDto,
  type GetFundingSourceByIdDto,
  type FundingSourceDatasource,
  type FundingSourceSummaryEntity,
  type FundingSourceRepository,
  type UpdateFundingSourceDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class FundingSourceRepositoryImpl implements FundingSourceRepository {
  constructor(private readonly datasource: FundingSourceDatasource) {}

  async create(createDto: CreateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<FundingSourceSummaryEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateFundingSourceDto): Promise<FundingSourceSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetFundingSourceByIdDto): Promise<FundingSourceSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
