import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreatePlannerPurchaseTask,
  CreatePlannerPurchaseTaskDto,
  DeletePlannerPurchaseTask,
  GetPlannerPurchaseTaskById,
  GetPlannerPurchaseTaskByIdDto,
  GetPlannerPurchaseTasksByPlannerPurchaseId,
  type PlannerPurchaseTaskEntity,
  type PlannerPurchaseTaskExtendedEntity,
  type PlannerPurchaseTaskRepository,
  type PlannerPurchaseTaskSummaryEntity,
  UpdatePlannerPurchaseTask,
  UpdatePlannerPurchaseTaskDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { parseISOStringToDate, parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerPurchaseTaskEntity, 'id'>>> {}

interface RequestQuery {
  plannerPurchaseId: string;
}

export class PlannerPurchaseTaskController {
  //* Dependency injection
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  public getAllByPlannerPurchaseId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { plannerPurchaseId = '' } = req.query;

    new GetPlannerPurchaseTasksByPlannerPurchaseId(this.repository)
      .execute(plannerPurchaseId)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerPurchaseTaskExtendedEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerPurchaseTaskByIdDto = GetPlannerPurchaseTaskByIdDto.create({ id });

    new GetPlannerPurchaseTaskById(this.repository)
      .execute(getPlannerPurchaseTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerPurchaseTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const {
      name,
      measureUnitId,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
      plannerPurchaseId,
    } = req.body;
    const createPlannerPurchaseTaskDto = CreatePlannerPurchaseTaskDto.create({
      name,
      measureUnitId,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
      plannerPurchaseId,
    });

    new CreatePlannerPurchaseTask(this.repository)
      .execute(createPlannerPurchaseTaskDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerPurchaseTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const {
      name,
      measureUnitId,
      expectedQuantityGoal,
      minimumQuantityGoal,
      accountPlanCodeReference,
      startDate,
      endDate,
      totalBudgetAmount,
    } = req.body;
    const updatePlannerPurchaseTaskDto = UpdatePlannerPurchaseTaskDto.create({
      id,
      name,
      measureUnitId,
      expectedQuantityGoal: parseStringNumber(expectedQuantityGoal),
      minimumQuantityGoal: parseStringNumber(minimumQuantityGoal),
      accountPlanCodeReference,
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      totalBudgetAmount: parseStringNumber(totalBudgetAmount),
    });

    new UpdatePlannerPurchaseTask(this.repository)
      .execute(updatePlannerPurchaseTaskDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerPurchaseTaskSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerPurchaseTaskByIdDto = GetPlannerPurchaseTaskByIdDto.create({ id });

    new DeletePlannerPurchaseTask(this.repository)
      .execute(getPlannerPurchaseTaskByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
