import { type NextFunction, type Request, type Response } from 'express';
import { type BaseListFilter, type SuccessResponse } from '../../../core';
import { GetManagementAreas, type ManagementAreaEntity, type ManagementAreaRepository } from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';

interface RequestQuery extends BaseListFilter {}

export class ManagementAreaController {
  //* Dependency injection
  constructor(private readonly managementAreaRepository: ManagementAreaRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<ManagementAreaEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetManagementAreas(this.managementAreaRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };
}
