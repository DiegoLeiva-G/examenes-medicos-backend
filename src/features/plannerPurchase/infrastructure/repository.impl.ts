import {
  type CreatePlannerPurchaseDto,
  type PlannerPurchaseSummaryEntity,
  type GetPlannerPurchaseByIdDto,
  type PlannerPurchaseRepository,
  type PlannerPurchaseDatasource,
} from '../domain';

export class PlannerPurchaseRepositoryImpl implements PlannerPurchaseRepository {
  constructor(private readonly datasource: PlannerPurchaseDatasource) {}

  async createPlannerPurchase(createDto: CreatePlannerPurchaseDto): Promise<PlannerPurchaseSummaryEntity> {
    return await this.datasource.createPlannerPurchase(createDto);
  }

  async getPlannerPurchaseById(getByIdDto: GetPlannerPurchaseByIdDto): Promise<PlannerPurchaseSummaryEntity> {
    return await this.datasource.getPlannerPurchaseById(getByIdDto);
  }
}
