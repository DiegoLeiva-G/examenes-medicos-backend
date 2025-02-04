import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  type PlannerSubsidySummaryEntity,
  GetPlannerSubsidyByIdDto,
  GetPlannerSubsidyById,
  type PlannerSubsidyEntity,
  CreatePlannerSubsidyDto,
  CreatePlannerSubsidy,
  type PlannerSubsidyRepository,
} from '../domain';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerSubsidyEntity, 'id'>>> {}

export class PlannerSubsidyController {
  //* Dependency injection
  constructor(private readonly plannerSubsidyRepository: PlannerSubsidyRepository) {}

  public getPlannerSubsidyById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSubsidySummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSubsidyByIdDto = GetPlannerSubsidyByIdDto.create({ id });

    new GetPlannerSubsidyById(this.plannerSubsidyRepository)
      .execute(getPlannerSubsidyByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createPlannerSubsidy = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSubsidySummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { plannerId } = req.body;
    const createPlannerSubsidyDto = CreatePlannerSubsidyDto.create({
      plannerId,
    });

    new CreatePlannerSubsidy(this.plannerSubsidyRepository)
      .execute(createPlannerSubsidyDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };
}
