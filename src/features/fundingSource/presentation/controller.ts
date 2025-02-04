import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateFundingSource,
  CreateFundingSourceDto,
  DeleteFundingSource,
  GetFundingSourceById,
  GetFundingSourceByIdDto,
  GetFundingSources,
  type FundingSourceEntity,
  type FundingSourceRepository,
  type FundingSourceSummaryEntity,
  UpdateFundingSource,
  UpdateFundingSourceDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseStringBoolean } from '../../../core/helpers';
import { type FundingSourceType } from '@prisma/client';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<FundingSourceEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class FundingSourceController {
  //* Dependency injection
  constructor(private readonly employeeRepository: FundingSourceRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<FundingSourceSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetFundingSources(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<FundingSourceSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getFundingSourceByIdDto = GetFundingSourceByIdDto.create({ id });

    new GetFundingSourceById(this.employeeRepository)
      .execute(getFundingSourceByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<FundingSourceSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { name, type, enabled } = req.body;
    const createFundingSourceDto = CreateFundingSourceDto.create({
      name,
      type: type as FundingSourceType,
      enabled: parseStringBoolean(enabled),
    });

    new CreateFundingSource(this.employeeRepository)
      .execute(createFundingSourceDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<FundingSourceSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, type, enabled } = req.body;
    const updateFundingSourceDto = UpdateFundingSourceDto.create({
      id,
      name,
      type: type as FundingSourceType,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateFundingSource(this.employeeRepository)
      .execute(updateFundingSourceDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<FundingSourceSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getFundingSourceByIdDto = GetFundingSourceByIdDto.create({ id });

    new DeleteFundingSource(this.employeeRepository)
      .execute(getFundingSourceByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
