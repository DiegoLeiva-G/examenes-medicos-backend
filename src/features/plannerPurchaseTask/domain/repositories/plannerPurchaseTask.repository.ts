import {
  type CreatePlannerPurchaseTaskDto,
  type GetPlannerPurchaseTaskByIdDto,
  type UpdatePlannerPurchaseTaskDto,
} from '../dtos';
import { type PlannerPurchaseTaskExtendedEntity, type PlannerPurchaseTaskSummaryEntity } from '../entities';
import { type PaginationResponseEntity } from '../../../_global';
import { type PlannerPurchaseEntity } from '../../../plannerPurchase';

export abstract class PlannerPurchaseTaskRepository {
  abstract create(createDto: CreatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity>;
  abstract getAllByPlannerPurchaseId(
    plannerPurchaseId: PlannerPurchaseEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerPurchaseTaskSummaryEntity[]>>;
  abstract getById(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskExtendedEntity>;
  abstract update(updateDto: UpdatePlannerPurchaseTaskDto): Promise<PlannerPurchaseTaskSummaryEntity>;
  abstract delete(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskSummaryEntity>;
}
