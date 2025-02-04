import { type PaginationResponseEntity } from '../../../_global';
import {
  type CreatePlannerSubsidyTaskDto,
  type GetPlannerSubsidyTaskByIdDto,
  type UpdatePlannerSubsidyTaskDto,
} from '../dtos';
import { type PlannerSubsidyTaskExtendedEntity, type PlannerSubsidyTaskSummaryEntity } from '../entities';
import { type PlannerSubsidyEntity } from '../../../plannerSubsidy';

export abstract class PlannerSubsidyTaskDatasource {
  abstract create(createDto: CreatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity>;
  abstract getAllByPlannerSubsidyId(
    plannerSubsidyId: PlannerSubsidyEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>>;
  abstract getById(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskExtendedEntity>;
  abstract update(updateDto: UpdatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity>;
  abstract delete(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskSummaryEntity>;
}
