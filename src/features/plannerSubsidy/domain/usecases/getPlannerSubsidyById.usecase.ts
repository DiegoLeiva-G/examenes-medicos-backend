import { type GetPlannerSubsidyByIdDto } from '../dtos';
import { type PlannerSubsidySummaryEntity } from '../entities';
import { type PlannerSubsidyRepository } from '../repositories';

export interface GetPlannerSubsidyByIdUseCase {
  execute: (getByIdDto: GetPlannerSubsidyByIdDto) => Promise<PlannerSubsidySummaryEntity>;
}

export class GetPlannerSubsidyById implements GetPlannerSubsidyByIdUseCase {
  constructor(private readonly repository: PlannerSubsidyRepository) {}

  async execute(getByIdDto: GetPlannerSubsidyByIdDto): Promise<PlannerSubsidySummaryEntity> {
    return await this.repository.getPlannerSubsidyById(getByIdDto);
  }
}
