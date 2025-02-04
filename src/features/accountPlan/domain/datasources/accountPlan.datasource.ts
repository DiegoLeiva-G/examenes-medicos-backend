import { type AccountPlanEntity, type PaginationAccountPlanResponseEntity } from '../entities';
import { type AccountPlanPaginationDto } from '../dtos';

export abstract class AccountPlanDatasource {
  abstract getAll(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>;
  abstract getIncomes(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>;
  abstract getExpenses(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>;
}
