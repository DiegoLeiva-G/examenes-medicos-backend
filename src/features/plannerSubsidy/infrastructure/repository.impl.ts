import {
  type CreatePlannerSubsidyDto,
  type PlannerSubsidySummaryEntity,
  type GetPlannerSubsidyByIdDto,
  type PlannerSubsidyRepository,
  type PlannerSubsidyDatasource,
} from '../domain';

export class PlannerSubsidyRepositoryImpl implements PlannerSubsidyRepository {
  constructor(private readonly datasource: PlannerSubsidyDatasource) {}

  async createPlannerSubsidy(createDto: CreatePlannerSubsidyDto): Promise<PlannerSubsidySummaryEntity> {
    return await this.datasource.createPlannerSubsidy(createDto);
  }

  async getPlannerSubsidyById(getByIdDto: GetPlannerSubsidyByIdDto): Promise<PlannerSubsidySummaryEntity> {
    return await this.datasource.getPlannerSubsidyById(getByIdDto);
  }
}
