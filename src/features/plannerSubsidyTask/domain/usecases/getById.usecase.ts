import { type GetPlannerSubsidyTaskByIdDto } from '../dtos';
import { type PlannerSubsidyTaskExtendedEntity } from '../entities';
import { type PlannerSubsidyTaskRepository } from '../repositories';

export interface GetPlannerSubsidyTaskByIdUseCase {
  execute: (getByIdDto: GetPlannerSubsidyTaskByIdDto) => Promise<PlannerSubsidyTaskExtendedEntity>;
}

export class GetPlannerSubsidyTaskById implements GetPlannerSubsidyTaskByIdUseCase {
  constructor(private readonly repository: PlannerSubsidyTaskRepository) {}

  async execute(getByIdDto: GetPlannerSubsidyTaskByIdDto): Promise<PlannerSubsidyTaskExtendedEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
