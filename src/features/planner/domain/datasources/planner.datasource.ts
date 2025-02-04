import { type PaginationResponseEntity } from '../../../_global';
import {
  type CreatePlannerToImprovementProjectDto,
  type CreatePlannerToInvestmentInitiativeDto,
  type GetPlannerByIdDto,
  type UpdatePlannerDto,
} from '../dtos';
import { type PlannerSummaryEntity } from '../entities';
import { type InvestmentInitiativeEntity } from '../../../investmentInitiative';
import { type ImprovementProjectEntity } from '../../../improvementProject';

// TODO: add delete
export abstract class PlannerDatasource {
  abstract createPlannerToInvestmentInitiative(
    createDto: CreatePlannerToInvestmentInitiativeDto,
  ): Promise<PlannerSummaryEntity>;
  abstract createPlannerToImprovementProject(
    createDto: CreatePlannerToImprovementProjectDto,
  ): Promise<PlannerSummaryEntity>;
  abstract getAllPlannersByInvestmentInitiativeId(
    investmentInitiativeId: InvestmentInitiativeEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>>;
  abstract getAllPlannersByImprovementProjectId(
    improvementProjectId: ImprovementProjectEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>>;
  abstract getPlannerById(getByIdDto: GetPlannerByIdDto): Promise<PlannerSummaryEntity>;
  abstract updatePlanner(updateDto: UpdatePlannerDto): Promise<PlannerSummaryEntity>;
}
