import { type NextFunction, type Request, type Response } from 'express';
import { type BaseListFilter, type SuccessResponse } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  GetStateById,
  GetStateByIdDto,
  GetStatesToSelect,
  GetSubStatesByStateIdToSelect,
  type LocationRepository,
  type StateEntity,
  type StateToSelectEntity,
  type SubStateEntity,
  type SubStateToSelectEntity,
} from '../domain';

interface Params {
  id: string;
}

interface RequestQuery extends BaseListFilter, Pick<SubStateEntity, 'stateId'> {}

export class LocationController {
  //* Dependency injection
  constructor(private readonly locationRepository: LocationRepository) {}

  public getStatesToSelect = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<StateToSelectEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetStatesToSelect(this.locationRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getStateById = (
    req: Request<Params>,
    res: Response<SuccessResponse<StateEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getStateByIdDto = GetStateByIdDto.create({ id });

    new GetStateById(this.locationRepository)
      .execute(getStateByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public getSubStatesByStateIdToSelect = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<SubStateToSelectEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '', stateId = '' } = req.query;
    const getStateByIdDto = GetStateByIdDto.create({ id: stateId });

    new GetStateById(this.locationRepository)
      .execute(getStateByIdDto)
      .then(resultState => {
        const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

        new GetSubStatesByStateIdToSelect(this.locationRepository)
          .execute(paginationDto, resultState.id)
          .then(result => res.json({ data: result }))
          .catch(error => {
            next(error);
          });
      })
      .catch(next);
  };
}
