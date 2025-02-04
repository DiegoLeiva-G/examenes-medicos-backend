import {
  type CreatePlannerPurchaseTaskDto,
  type GetPlannerPurchaseTaskByIdDto,
  type PlannerPurchaseTaskDatasource,
  type PlannerPurchaseTaskSummaryEntity,
  type PlannerPurchaseTaskRepository,
  type UpdatePlannerPurchaseTaskDto,
  type PlannerPurchaseTaskExtendedEntity,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerPurchaseEntity } from '../../plannerPurchase';

export class PlannerPurchaseTaskRepositoryImpl implements PlannerPurchaseTaskRepository {
  constructor(private readonly datasource: PlannerPurchaseTaskDatasource) {}

  async create(createDto: CreatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getAllByPlannerPurchaseId(
    plannerPurchaseId: PlannerPurchaseEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>> {
    return await this.datasource.getAllByPlannerPurchaseId(plannerPurchaseId);
  }

  async getById(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskExtendedEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
