import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateIncomeBudget,
  CreateIncomeBudgetDetail,
  CreateIncomeBudgetDetailDto,
  CreateIncomeBudgetDto,
  DeleteIncomeBudgetDetail,
  GetIncomeBudgetById,
  GetIncomeBudgetByIdDto,
  GetIncomeBudgetDetailById,
  GetIncomeBudgetDetailByIdDto,
  GetIncomeBudgetDetailsByIncomeBudgetId,
  GetIncomeBudgets,
  type IncomeBudgetDetailEntity,
  type IncomeBudgetDetailSummaryEntity,
  type IncomeBudgetEntity,
  type IncomeBudgetRepository,
  type IncomeBudgetSummaryEntity,
  UpdateIncomeBudgetDetail,
  UpdateIncomeBudgetDetailDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseStringNumber, parseStringToBigInt } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody
  extends Partial<AllInterfaceString<Omit<IncomeBudgetEntity, 'id'>>>,
    Partial<AllInterfaceString<Omit<IncomeBudgetDetailEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
  incomeBudgetId: IncomeBudgetSummaryEntity['id'];
}

export class IncomeBudgetController {
  //* Dependency injection
  constructor(private readonly employeeRepository: IncomeBudgetRepository) {}

  public getAllIncomeBudgets = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetIncomeBudgets(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getAllIncomeBudgetDetailsByIncomeBudgetId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '', incomeBudgetId = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetIncomeBudgetDetailsByIncomeBudgetId(this.employeeRepository)
      .execute(paginationDto, incomeBudgetId)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getIncomeBudgetById = (
    req: Request<Params>,
    res: Response<SuccessResponse<IncomeBudgetSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getIncomeBudgetByIdDto = GetIncomeBudgetByIdDto.create({ id });

    new GetIncomeBudgetById(this.employeeRepository)
      .execute(getIncomeBudgetByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public getIncomeBudgetDetailById = (
    req: Request<Params>,
    res: Response<SuccessResponse<IncomeBudgetDetailSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getIncomeBudgetByIdDto = GetIncomeBudgetDetailByIdDto.create({ id });

    new GetIncomeBudgetDetailById(this.employeeRepository)
      .execute(getIncomeBudgetByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createIncomeBudget = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<IncomeBudgetSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { year } = req.body;
    const createIncomeBudgetDto = CreateIncomeBudgetDto.create({
      year: parseStringNumber(year),
    });

    new CreateIncomeBudget(this.employeeRepository)
      .execute(createIncomeBudgetDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public createIncomeBudgetDetail = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<IncomeBudgetDetailSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { incomeBudgetId, amount, accountName, accountCode } = req.body;
    const createIncomeBudgetDetailDto = CreateIncomeBudgetDetailDto.create({
      incomeBudgetId,
      amount: parseStringToBigInt(amount),
      accountName,
      accountCode,
    });

    new CreateIncomeBudgetDetail(this.employeeRepository)
      .execute(createIncomeBudgetDetailDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateIncomeBudgetDetail = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<IncomeBudgetDetailSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { amount, accountName } = req.body;
    const updateIncomeBudgetDto = UpdateIncomeBudgetDetailDto.create({
      id,
      amount: parseStringToBigInt(amount),
      accountName,
    });

    new UpdateIncomeBudgetDetail(this.employeeRepository)
      .execute(updateIncomeBudgetDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public deleteIncomeBudgetDetail = (
    req: Request<Params>,
    res: Response<SuccessResponse<IncomeBudgetDetailSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getIncomeBudgetByIdDto = GetIncomeBudgetDetailByIdDto.create({ id });

    new DeleteIncomeBudgetDetail(this.employeeRepository)
      .execute(getIncomeBudgetByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
