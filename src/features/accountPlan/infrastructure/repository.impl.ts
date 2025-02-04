import {
  type AccountPlanDatasource,
  type AccountPlanEntity,
  type AccountPlanPaginationDto,
  type AccountPlanRepository,
  type PaginationAccountPlanResponseEntity,
} from '../domain';

export class AccountPlanRepositoryImpl implements AccountPlanRepository {
  constructor(private readonly datasource: AccountPlanDatasource) {}

  async getAll(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getIncomes(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    return await this.datasource.getIncomes(pagination);
  }

  async getExpenses(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    return await this.datasource.getExpenses(pagination);
  }
}
