import {
  type CreatePlannerHiringTaskDto,
  type GetPlannerHiringTaskByIdDto,
  type PlannerHiringTaskDatasource,
  type PlannerHiringTaskSummaryEntity,
  type PlannerHiringTaskRepository,
  type UpdatePlannerHiringTaskDto,
  type PlannerHiringTaskExtendedEntity,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerHiringEntity } from '../../plannerHiring';
import { type PlannerSpecialHiringEntity } from '../../plannerSpecialHiring';

export class PlannerHiringTaskRepositoryImpl implements PlannerHiringTaskRepository {
  constructor(private readonly datasource: PlannerHiringTaskDatasource) {}

  async create(createDto: CreatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getAllByPlannerHiringId(
    plannerHiringId: PlannerHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    return await this.datasource.getAllByPlannerHiringId(plannerHiringId);
  }

  async getAllByPlannerSpecialHiringId(
    plannerSpecialHiringId: PlannerSpecialHiringEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerHiringTaskSummaryEntity[]>> {
    return await this.datasource.getAllByPlannerSpecialHiringId(plannerSpecialHiringId);
  }

  async getById(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskExtendedEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdatePlannerHiringTaskDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
