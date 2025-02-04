import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  type PlannerPurchaseSummaryEntity,
  GetPlannerPurchaseByIdDto,
  GetPlannerPurchaseById,
  type PlannerPurchaseEntity,
  CreatePlannerPurchaseDto,
  CreatePlannerPurchase,
  type PlannerPurchaseRepository,
} from '../domain';
import { parseStringNumber } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerPurchaseEntity, 'id'>>> {}

export class PlannerPurchaseController {
  //* Dependency injection
  constructor(private readonly plannerPurchaseRepository: PlannerPurchaseRepository) {}

  public getPlannerPurchaseById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerPurchaseSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerPurchaseByIdDto = GetPlannerPurchaseByIdDto.create({ id });

    new GetPlannerPurchaseById(this.plannerPurchaseRepository)
      .execute(getPlannerPurchaseByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createPlannerPurchase = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerPurchaseSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { plannerId, managementAreaCodeReference, directorateCodeReference, costCenterCodeReference } = req.body;
    const createPlannerPurchaseDto = CreatePlannerPurchaseDto.create({
      plannerId,
      managementAreaCodeReference: parseStringNumber(managementAreaCodeReference),
      directorateCodeReference: parseStringNumber(directorateCodeReference),
      costCenterCodeReference: parseStringNumber(costCenterCodeReference),
    });

    new CreatePlannerPurchase(this.plannerPurchaseRepository)
      .execute(createPlannerPurchaseDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };
}
