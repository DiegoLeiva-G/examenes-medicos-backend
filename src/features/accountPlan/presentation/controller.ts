import { type NextFunction, type Request, type Response } from 'express';
import { type BaseListFilter, type SuccessResponse } from '../../../core';
import {
  type AccountPlanEntity,
  AccountPlanPaginationDto,
  type AccountPlanRepository,
  GetAccountsPlan,
  GetExpensesAccountPlan,
  GetIncomesAccountPlan,
  type PaginationAccountPlanResponseEntity,
} from '../domain';

interface RequestQuery extends BaseListFilter {
  year: string;
}

export class AccountPlanController {
  //* Dependency injection
  constructor(private readonly accountPlanRepository: AccountPlanRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '', year = new Date().getFullYear() } = req.query;
    const paginationDto = AccountPlanPaginationDto.create({ page: +page, limit: +limit, search, year: +year });

    new GetAccountsPlan(this.accountPlanRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getIncomes = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '', year = new Date().getFullYear() } = req.query;
    const paginationDto = AccountPlanPaginationDto.create({ page: +page, limit: +limit, search, year: +year });

    new GetIncomesAccountPlan(this.accountPlanRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getExpenses = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '', year = new Date().getFullYear() } = req.query;
    const paginationDto = AccountPlanPaginationDto.create({ page: +page, limit: +limit, search, year: +year });

    new GetExpensesAccountPlan(this.accountPlanRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };
}
