import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreatePlannerSubsidyTask,
  CreatePlannerSubsidyTaskDto,
  DeletePlannerSubsidyTask,
  GetPlannerSubsidyTaskById,
  GetPlannerSubsidyTaskByIdDto,
  GetPlannerSubsidyTasksByPlannerSubsidyId,
  type PlannerSubsidyTaskEntity,
  type PlannerSubsidyTaskExtendedEntity,
  type PlannerSubsidyTaskRepository,
  type PlannerSubsidyTaskSummaryEntity,
  UpdatePlannerSubsidyTask,
  UpdatePlannerSubsidyTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { parseISOStringToDate, parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerSubsidyTaskEntity, 'id'>>> {}

interface RequestQuery {
  plannerSubsidyId: string;
}

export class PlannerSubsidyTaskController {
  //* Dependency injection
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  public getAllByPlannerSubsidyId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { plannerSubsidyId = '' } = req.query;

    new GetPlannerSubsidyTasksByPlannerSubsidyId(this.repository)
      .execute(plannerSubsidyId)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSubsidyTaskExtendedEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSubsidyTaskByIdDto = GetPlannerSubsidyTaskByIdDto.create({ id });

    new GetPlannerSubsidyTaskById(this.repository)
      .execute(getPlannerSubsidyTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  // TODO: extend to special hiring
  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSubsidyTaskSummaryEntity>>,
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
      plannerSubsidyId,
    } = req.body;
    const createPlannerSubsidyTaskDto = CreatePlannerSubsidyTaskDto.create({
      name,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
      plannerSubsidyId,
    });

    new CreatePlannerSubsidyTask(this.repository)
      .execute(createPlannerSubsidyTaskDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSubsidyTaskSummaryEntity>>,
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
    const updatePlannerSubsidyTaskDto = UpdatePlannerSubsidyTaskDto.create({
      id,
      name,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
    });

    new UpdatePlannerSubsidyTask(this.repository)
      .execute(updatePlannerSubsidyTaskDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSubsidyTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSubsidyTaskByIdDto = GetPlannerSubsidyTaskByIdDto.create({ id });

    new DeletePlannerSubsidyTask(this.repository)
      .execute(getPlannerSubsidyTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
