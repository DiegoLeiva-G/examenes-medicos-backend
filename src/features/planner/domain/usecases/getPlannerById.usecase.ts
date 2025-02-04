import { type GetPlannerByIdDto } from '../dtos';
import { type PlannerSummaryEntity } from '../entities';
import { type PlannerRepository } from '../repositories';

export interface GetPlannerByIdUseCase {
  execute: (getByIdDto: GetPlannerByIdDto) => Promise<PlannerSummaryEntity>;
}

export class GetPlannerById implements GetPlannerByIdUseCase {
  constructor(private readonly repository: PlannerRepository) {}

  async execute(getByIdDto: GetPlannerByIdDto): Promise<PlannerSummaryEntity> {
    return await this.repository.getPlannerById(getByIdDto);
  }
}
