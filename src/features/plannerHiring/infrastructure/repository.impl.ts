import {
  type CreatePlannerHiringDto,
  type PlannerHiringSummaryEntity,
  type GetPlannerHiringByIdDto,
  type PlannerHiringRepository,
  type PlannerHiringDatasource,
} from '../domain';

export class PlannerHiringRepositoryImpl implements PlannerHiringRepository {
  constructor(private readonly datasource: PlannerHiringDatasource) {}

  async createPlannerHiring(createDto: CreatePlannerHiringDto): Promise<PlannerHiringSummaryEntity> {
    return await this.datasource.createPlannerHiring(createDto);
  }

  async getPlannerHiringById(getByIdDto: GetPlannerHiringByIdDto): Promise<PlannerHiringSummaryEntity> {
    return await this.datasource.getPlannerHiringById(getByIdDto);
  }
}
