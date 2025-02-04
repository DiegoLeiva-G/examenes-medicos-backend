import {
  type CreatePlannerSubsidyTaskDto,
  type GetPlannerSubsidyTaskByIdDto,
  type PlannerSubsidyTaskDatasource,
  type PlannerSubsidyTaskSummaryEntity,
  type PlannerSubsidyTaskRepository,
  type UpdatePlannerSubsidyTaskDto,
  type PlannerSubsidyTaskExtendedEntity,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { type PlannerSubsidyEntity } from '../../plannerSubsidy';

export class PlannerSubsidyTaskRepositoryImpl implements PlannerSubsidyTaskRepository {
  constructor(private readonly datasource: PlannerSubsidyTaskDatasource) {}

  async create(createDto: CreatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getAllByPlannerSubsidyId(
    plannerSubsidyId: PlannerSubsidyEntity['id'],
  ): Promise<PaginationResponseEntity<PlannerSubsidyTaskSummaryEntity[]>> {
    return await this.datasource.getAllByPlannerSubsidyId(plannerSubsidyId);
  }

  async getById(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskExtendedEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdatePlannerSubsidyTaskDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
