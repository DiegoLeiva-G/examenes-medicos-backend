import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  GetPlannerCouncilorSalaryByIdDto,
  GetPlannerCouncilorSalaryById,
  type PlannerCouncilorSalaryEntity,
  type PlannerCouncilorSalaryCreateResponseEntity,
  type PlannerCouncilorSalaryGetByIdResponseEntity,
  CreatePlannerCouncilorSalaryDto,
  CreatePlannerCouncilorSalary,
  type PlannerCouncilorSalaryRepository,
} from '../domain';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerCouncilorSalaryEntity, 'id'>>> {}

export class PlannerCouncilorSalaryController {
  //* Dependency injection
  constructor(private readonly plannerCouncilorSalaryRepository: PlannerCouncilorSalaryRepository) {}

  public getPlannerCouncilorSalaryById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerCouncilorSalaryGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerCouncilorSalaryByIdDto = GetPlannerCouncilorSalaryByIdDto.create({ id });

    new GetPlannerCouncilorSalaryById(this.plannerCouncilorSalaryRepository)
      .execute(getPlannerCouncilorSalaryByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createPlannerCouncilorSalary = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerCouncilorSalaryCreateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { plannerId } = req.body;
    const createPlannerCouncilorSalaryDto = CreatePlannerCouncilorSalaryDto.create({
      plannerId,
    });

    new CreatePlannerCouncilorSalary(this.plannerCouncilorSalaryRepository)
      .execute(createPlannerCouncilorSalaryDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };
}
