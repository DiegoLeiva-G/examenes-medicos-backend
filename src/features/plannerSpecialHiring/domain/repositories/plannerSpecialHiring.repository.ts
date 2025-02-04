import {
  type RequestPlannerSpecialHiringDto,
  type GetPlannerSpecialHiringByIdDto,
  type DeterminatePlannerSpecialHiringDto,
} from '../dtos';
import {
  type PlannerSpecialHiringEntity,
  type PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
  type PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
  type PlannerSpecialHiringGetByIdResponseEntity,
  type PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity,
  type PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity,
  type PlannerSpecialHiringRequestDeterminationResponseEntity,
  type PlannerSpecialHiringRequestResponseEntity,
} from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';

export abstract class PlannerSpecialHiringRepository {
  abstract requestPlannerSpecialHiring(
    requestDto: RequestPlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestResponseEntity>;
  abstract getPlannerSpecialHiringById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringGetByIdResponseEntity>;
  abstract getAllPlannerSpecialHiringRequestImprovementProject(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>>;
  abstract getAllPlannerSpecialHiringRequestInvestmentInitiative(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>>;
  abstract getPlannerSpecialHiringRequestDetailImprovementProjectById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity>;
  abstract getPlannerSpecialHiringRequestDetailInvestmentInitiativeById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity>;
  abstract determinatePlannerSpecialHiring(
    determinateDto: DeterminatePlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestDeterminationResponseEntity>;
}
