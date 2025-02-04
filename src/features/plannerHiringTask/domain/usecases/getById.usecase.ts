import { type GetPlannerHiringTaskByIdDto } from '../dtos';
import { type PlannerHiringTaskExtendedEntity } from '../entities';
import { type PlannerHiringTaskRepository } from '../repositories';

export interface GetPlannerHiringTaskByIdUseCase {
  execute: (getByIdDto: GetPlannerHiringTaskByIdDto) => Promise<PlannerHiringTaskExtendedEntity>;
}

export class GetPlannerHiringTaskById implements GetPlannerHiringTaskByIdUseCase {
  constructor(private readonly repository: PlannerHiringTaskRepository) {}

  async execute(getByIdDto: GetPlannerHiringTaskByIdDto): Promise<PlannerHiringTaskExtendedEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
