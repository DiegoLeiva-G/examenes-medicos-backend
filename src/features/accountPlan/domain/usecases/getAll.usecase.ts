import { type AccountPlanEntity, type PaginationAccountPlanResponseEntity } from '../entities';
import { type AccountPlanRepository } from '../repositories';
import { type AccountPlanPaginationDto } from '../dtos';

export interface GetAccountsPlanUseCase {
  execute: (pagination: AccountPlanPaginationDto) => Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>;
}

export class GetAccountsPlan implements GetAccountsPlanUseCase {
  constructor(private readonly repository: AccountPlanRepository) {}

  async execute(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
