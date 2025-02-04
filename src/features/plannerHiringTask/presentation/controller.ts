import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreatePlannerHiringTask,
  CreatePlannerHiringTaskDto,
  DeletePlannerHiringTask,
  GetPlannerHiringTaskById,
  GetPlannerHiringTaskByIdDto,
  GetPlannerHiringTasksByPlannerHiringId,
  type PlannerHiringTaskEntity,
  type PlannerHiringTaskExtendedEntity,
  type PlannerHiringTaskRepository,
  type PlannerHiringTaskSummaryEntity,
  UpdatePlannerHiringTask,
  UpdatePlannerHiringTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { parseISOStringToDate, parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerHiringTaskEntity, 'id'>>> {}

interface RequestQuery {
  plannerHiringId: string;
}

// TODO: add missing values
export class PlannerHiringTaskController {
  //* Dependency injection
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  public getAllByPlannerHiringId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { plannerHiringId = '' } = req.query;

    new GetPlannerHiringTasksByPlannerHiringId(this.repository)
      .execute(plannerHiringId)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerHiringTaskExtendedEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerHiringTaskByIdDto = GetPlannerHiringTaskByIdDto.create({ id });

    new GetPlannerHiringTaskById(this.repository)
      .execute(getPlannerHiringTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerHiringTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
      plannerHiringId,
      plannerSpecialHiringId,
    } = req.body;
    const createPlannerHiringTaskDto = CreatePlannerHiringTaskDto.create({
      name,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
      plannerHiringId,
      plannerSpecialHiringId,
    });

    new CreatePlannerHiringTask(this.repository)
      .execute(createPlannerHiringTaskDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerHiringTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const {
      name,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
    } = req.body;
    const updatePlannerHiringTaskDto = UpdatePlannerHiringTaskDto.create({
      id,
      name,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
    });

    new UpdatePlannerHiringTask(this.repository)
      .execute(updatePlannerHiringTaskDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerHiringTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerHiringTaskByIdDto = GetPlannerHiringTaskByIdDto.create({ id });

    new DeletePlannerHiringTask(this.repository)
      .execute(getPlannerHiringTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
