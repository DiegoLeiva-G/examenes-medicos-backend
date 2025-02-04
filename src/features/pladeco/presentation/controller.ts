import { type NextFunction, type Request, type Response } from 'express';
import { type SuccessResponse } from '../../../core';
import {
  GetSpecificsPladeco,
  GetStrategicsPladeco,
  type PladecoRepository,
  type SpecificPladecoToListEntity,
  type StrategicPladecoToListEntity,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class PladecoController {
  //* Dependency injection
  constructor(private readonly pladecoRepository: PladecoRepository) {}

  public getStrategics = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<StrategicPladecoToListEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetStrategicsPladeco(this.pladecoRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getSpecifics = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<SpecificPladecoToListEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetSpecificsPladeco(this.pladecoRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };
}
