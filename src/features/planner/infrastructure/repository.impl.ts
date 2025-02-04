import {
  type CreatePlannerToInvestmentInitiativeDto,
  type CreatePlannerToImprovementProjectDto,
  type GetPlannerByIdDto,
  type PlannerDatasource,
  type PlannerSummaryEntity,
  type PlannerRepository,
  type UpdatePlannerDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type InvestmentInitiativeEntity } from '../../investmentInitiative';
import { type ImprovementProjectEntity } from '../../improvementProject';

export class PlannerRepositoryImpl implements PlannerRepository {
  constructor(private readonly datasource: PlannerDatasource) {}

  async createPlannerToInvestmentInitiative(
    createDto: CreatePlannerToInvestmentInitiativeDto,
  ): Promise<PlannerSummaryEntity> {
    return await this.datasource.createPlannerToInvestmentInitiative(createDto);
  }

  async createPlannerToImprovementProject(
    createDto: CreatePlannerToImprovementProjectDto,
  ): Promise<PlannerSummaryEntity> {
    return await this.datasource.createPlannerToImprovementProject(createDto);
  }

  async getAllPlannersByInvestmentInitiativeId(
    investmentInitiativeId: InvestmentInitiativeEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    return await this.datasource.getAllPlannersByInvestmentInitiativeId(investmentInitiativeId);
  }

  async getAllPlannersByImprovementProjectId(
    improvementProjectId: ImprovementProjectEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSummaryEntity[]>> {
    return await this.datasource.getAllPlannersByImprovementProjectId(improvementProjectId);
  }

  async getPlannerById(getByIdDto: GetPlannerByIdDto): Promise<PlannerSummaryEntity> {
    return await this.datasource.getPlannerById(getByIdDto);
  }

  async updatePlanner(updateDto: UpdatePlannerDto): Promise<PlannerSummaryEntity> {
    return await this.datasource.updatePlanner(updateDto);
  }
}
