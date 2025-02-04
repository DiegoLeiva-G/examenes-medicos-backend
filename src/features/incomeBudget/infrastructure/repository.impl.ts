import {
  type CreateIncomeBudgetDto,
  type IncomeBudgetDatasource,
  type IncomeBudgetSummaryEntity,
  type IncomeBudgetRepository,
  type CreateIncomeBudgetDetailDto,
  type IncomeBudgetDetailSummaryEntity,
  type GetIncomeBudgetDetailByIdDto,
  type UpdateIncomeBudgetDetailDto,
  type GetIncomeBudgetByIdDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class IncomeBudgetRepositoryImpl implements IncomeBudgetRepository {
  constructor(private readonly datasource: IncomeBudgetDatasource) {}

  async createIncomeBudget(createDto: CreateIncomeBudgetDto): Promise<IncomeBudgetSummaryEntity> {
    return await this.datasource.createIncomeBudget(createDto);
  }

  async createIncomeBudgetDetail(createDto: CreateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.datasource.createIncomeBudgetDetail(createDto);
  }

  async getAllIncomeBudgets(pagination: PaginationDto): Promise<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>> {
    return await this.datasource.getAllIncomeBudgets(pagination);
  }

  async getAllIncomeBudgetDetailsByIncomeBudgetId(
    pagination: PaginationDto,
    incomeBudgetId: IncomeBudgetSummaryEntity['id'],
  ): Promise<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>> {
    return await this.datasource.getAllIncomeBudgetDetailsByIncomeBudgetId(pagination, incomeBudgetId);
  }

  async getIncomeBudgetById(getByIdDto: GetIncomeBudgetByIdDto): Promise<IncomeBudgetSummaryEntity> {
    return await this.datasource.getIncomeBudgetById(getByIdDto);
  }

  async getIncomeBudgetDetailById(getByIdDto: GetIncomeBudgetDetailByIdDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.datasource.getIncomeBudgetDetailById(getByIdDto);
  }

  async updateIncomeBudgetDetail(updateDto: UpdateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.datasource.updateIncomeBudgetDetail(updateDto);
  }

  async deleteIncomeBudgetDetailById(
    getByIdDto: GetIncomeBudgetDetailByIdDto,
  ): Promise<IncomeBudgetDetailSummaryEntity> {
    return await this.datasource.deleteIncomeBudgetDetailById(getByIdDto);
  }
}
