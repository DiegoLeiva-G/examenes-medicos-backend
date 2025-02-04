import { type CreatePlannerPurchaseDto, type GetPlannerPurchaseByIdDto } from '../dtos';
import { type PlannerPurchaseSummaryEntity } from '../entities';

// TODO: add delete and update
export abstract class PlannerPurchaseRepository {
  abstract createPlannerPurchase(createDto: CreatePlannerPurchaseDto): Promise<PlannerPurchaseSummaryEntity>;
  abstract getPlannerPurchaseById(getByIdDto: GetPlannerPurchaseByIdDto): Promise<PlannerPurchaseSummaryEntity>;
}
