import { type PaginationResponseEntity } from '../../../_global';
import {
  type CreatePlannerHiringTaskDto,
  type GetPlannerHiringTaskByIdDto,
  type UpdatePlannerHiringTaskDto,
} from '../dtos';
import { type PlannerHiringTaskExtendedEntity, type PlannerHiringTaskSummaryEntity } from '../entities';
import { type PlannerHiringEntity } from '../../../plannerHiring';
import type { PlannerSpecialHiringEntity } from '../../../plannerSpecialHiring';

export abstract class PlannerHiringTaskDatasource {
  abstract create(createDto: CreatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity>;
  abstract getAllByPlannerHiringId(
    plannerHiringId: PlannerHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>>;
  abstract getAllByPlannerSpecialHiringId(
    plannerSpecialHiringId: PlannerSpecialHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>>;
  abstract getById(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskExtendedEntity>;
  abstract update(updateDto: UpdatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity>;
  abstract delete(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskSummaryEntity>;
}
