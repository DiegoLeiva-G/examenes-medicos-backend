import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  type PlannerHiringSummaryEntity,
  GetPlannerHiringByIdDto,
  GetPlannerHiringById,
  type PlannerHiringEntity,
  CreatePlannerHiringDto,
  CreatePlannerHiring,
  type PlannerHiringRepository,
} from '../domain';
import { parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerHiringEntity, 'id'>>> {}

export class PlannerHiringController {
  //* Dependency injection
  constructor(private readonly plannerHiringRepository: PlannerHiringRepository) {}

  public getPlannerHiringById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerHiringSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerHiringByIdDto = GetPlannerHiringByIdDto.create({ id });

    new GetPlannerHiringById(this.plannerHiringRepository)
      .execute(getPlannerHiringByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createPlannerHiring = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerHiringSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { plannerId, managementAreaCodeReference, directorateCodeReference, costCenterCodeReference } = req.body;
    const createPlannerHiringDto = CreatePlannerHiringDto.create({
      plannerId,
      managementAreaCodeReference: parseStringNumber(managementAreaCodeReference),
      directorateCodeReference: parseStringNumber(directorateCodeReference),
      costCenterCodeReference: parseStringNumber(costCenterCodeReference),
    });

    new CreatePlannerHiring(this.plannerHiringRepository)
      .execute(createPlannerHiringDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };
}
