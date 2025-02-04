import { type CreatePlannerHiringDto, type GetPlannerHiringByIdDto } from '../dtos';
import { type PlannerHiringSummaryEntity } from '../entities';

// TODO: add delete and update
export abstract class PlannerHiringRepository {
  abstract createPlannerHiring(createDto: CreatePlannerHiringDto): Promise<PlannerHiringSummaryEntity>;
  abstract getPlannerHiringById(getByIdDto: GetPlannerHiringByIdDto): Promise<PlannerHiringSummaryEntity>;
}
