import { type CreatePlannerSubsidyDto, type GetPlannerSubsidyByIdDto } from '../dtos';
import { type PlannerSubsidySummaryEntity } from '../entities';

// TODO: add delete and update
export abstract class PlannerSubsidyRepository {
  abstract createPlannerSubsidy(createDto: CreatePlannerSubsidyDto): Promise<PlannerSubsidySummaryEntity>;
  abstract getPlannerSubsidyById(getByIdDto: GetPlannerSubsidyByIdDto): Promise<PlannerSubsidySummaryEntity>;
}
