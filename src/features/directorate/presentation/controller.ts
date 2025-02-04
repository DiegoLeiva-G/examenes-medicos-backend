import { type NextFunction, type Request, type Response } from 'express';
import { type SuccessResponse } from '../../../core';
import {
  type DirectorateEntity,
  type DirectorateRepository,
  GetDirectorates,
  GetDirectoratesWithDepartments,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class DirectorateController {
  //* Dependency injection
  constructor(private readonly directorateRepository: DirectorateRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<DirectorateEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });
    new GetDirectorates(this.directorateRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getAllWithDepartments = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<DirectorateEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });
    new GetDirectoratesWithDepartments(this.directorateRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };
}
