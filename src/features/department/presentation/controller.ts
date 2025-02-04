import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateDepartment,
  CreateDepartmentDto,
  DeleteDepartment,
  GetDepartmentById,
  GetDepartmentByIdDto,
  type DepartmentEntity,
  type DepartmentRepository,
  type DepartmentSummaryEntity,
  UpdateDepartment,
  UpdateDepartmentDto,
} from '../domain';
import { parseStringBoolean, parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<DepartmentEntity, 'id'>>> {}

export class DepartmentController {
  //* Dependency injection
  constructor(private readonly employeeRepository: DepartmentRepository) {}

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<DepartmentSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getDepartmentByIdDto = GetDepartmentByIdDto.create({ id });

    new GetDepartmentById(this.employeeRepository)
      .execute(getDepartmentByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<DepartmentSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { name, directorateCodeReference, description, subDepartmentId, enabled } = req.body;
    const createDepartmentDto = CreateDepartmentDto.create({
      name,
      directorateCodeReference: parseStringNumber(directorateCodeReference),
      description,
      subDepartmentId,
      enabled: parseStringBoolean(enabled),
    });

    new CreateDepartment(this.employeeRepository)
      .execute(createDepartmentDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<DepartmentSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, directorateCodeReference, description, subDepartmentId, enabled } = req.body;
    const updateDepartmentDto = UpdateDepartmentDto.create({
      id,
      name,
      directorateCodeReference: parseStringNumber(directorateCodeReference),
      description,
      subDepartmentId,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateDepartment(this.employeeRepository)
      .execute(updateDepartmentDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<DepartmentSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getDepartmentByIdDto = GetDepartmentByIdDto.create({ id });

    new DeleteDepartment(this.employeeRepository)
      .execute(getDepartmentByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
