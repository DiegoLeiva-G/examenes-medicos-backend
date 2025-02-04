import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateMeasureUnit,
  CreateMeasureUnitDto,
  DeleteMeasureUnit,
  GetMeasureUnitById,
  GetMeasureUnitByIdDto,
  GetMeasureUnits,
  type MeasureUnitEntity,
  type MeasureUnitRepository,
  type MeasureUnitSummaryEntity,
  UpdateMeasureUnit,
  UpdateMeasureUnitDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseStringBoolean } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<MeasureUnitEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class MeasureUnitController {
  //* Dependency injection
  constructor(private readonly employeeRepository: MeasureUnitRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<MeasureUnitSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetMeasureUnits(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<MeasureUnitSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMeasureUnitByIdDto = GetMeasureUnitByIdDto.create({ id });

    new GetMeasureUnitById(this.employeeRepository)
      .execute(getMeasureUnitByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<MeasureUnitSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { name, enabled } = req.body;
    const createMeasureUnitDto = CreateMeasureUnitDto.create({
      name,
      enabled: parseStringBoolean(enabled),
    });

    new CreateMeasureUnit(this.employeeRepository)
      .execute(createMeasureUnitDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<MeasureUnitSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, enabled } = req.body;
    const updateMeasureUnitDto = UpdateMeasureUnitDto.create({ id, name, enabled: parseStringBoolean(enabled) });

    new UpdateMeasureUnit(this.employeeRepository)
      .execute(updateMeasureUnitDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<MeasureUnitSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMeasureUnitByIdDto = GetMeasureUnitByIdDto.create({ id });

    new DeleteMeasureUnit(this.employeeRepository)
      .execute(getMeasureUnitByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
