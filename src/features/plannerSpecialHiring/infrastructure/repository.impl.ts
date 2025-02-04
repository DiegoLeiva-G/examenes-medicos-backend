import {
  type RequestPlannerSpecialHiringDto,
  type GetPlannerSpecialHiringByIdDto,
  type PlannerSpecialHiringRepository,
  type PlannerSpecialHiringDatasource,
  type PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
  type PlannerSpecialHiringGetByIdResponseEntity,
  type PlannerSpecialHiringRequestResponseEntity,
  type PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
  type PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity,
  type PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity,
  type DeterminatePlannerSpecialHiringDto,
  type PlannerSpecialHiringRequestDeterminationResponseEntity,
  type PlannerSpecialHiringEntity,
} from '../domain';
import type { PaginationDto, PaginationResponseEntity } from '../../_global';

export class PlannerSpecialHiringRepositoryImpl implements PlannerSpecialHiringRepository {
  constructor(private readonly datasource: PlannerSpecialHiringDatasource) {}

  async requestPlannerSpecialHiring(
    requestDto: RequestPlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestResponseEntity> {
    return await this.datasource.requestPlannerSpecialHiring(requestDto);
  }

  async getPlannerSpecialHiringById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringGetByIdResponseEntity> {
    return await this.datasource.getPlannerSpecialHiringById(getByIdDto);
  }

  async getAllPlannerSpecialHiringRequestImprovementProject(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>> {
    return await this.datasource.getAllPlannerSpecialHiringRequestImprovementProject(pagination, processYear, status);
  }

  async getAllPlannerSpecialHiringRequestInvestmentInitiative(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>> {
    return await this.datasource.getAllPlannerSpecialHiringRequestInvestmentInitiative(pagination, processYear, status);
  }

  async getPlannerSpecialHiringRequestDetailImprovementProjectById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity> {
    return await this.datasource.getPlannerSpecialHiringRequestDetailImprovementProjectById(getByIdDto);
  }

  async getPlannerSpecialHiringRequestDetailInvestmentInitiativeById(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity> {
    return await this.datasource.getPlannerSpecialHiringRequestDetailInvestmentInitiativeById(getByIdDto);
  }

  async determinatePlannerSpecialHiring(
    determinateDto: DeterminatePlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestDeterminationResponseEntity> {
    return await this.datasource.determinatePlannerSpecialHiring(determinateDto);
  }
}
