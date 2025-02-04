import { type AccountPlanEntity, type PaginationAccountPlanResponseEntity } from '../entities';
import { type AccountPlanRepository } from '../repositories';
import { type AccountPlanPaginationDto } from '../dtos';

export interface GetExpensesAccountPlanUseCase {
  execute: (pagination: AccountPlanPaginationDto) => Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>;
}

export class GetExpensesAccountPlan implements GetExpensesAccountPlanUseCase {
  constructor(private readonly repository: AccountPlanRepository) {}

  async execute(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    return await this.repository.getExpenses(pagination);
  }
}
