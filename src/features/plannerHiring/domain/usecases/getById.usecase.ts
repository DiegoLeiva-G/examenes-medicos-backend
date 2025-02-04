import { type GetPlannerHiringByIdDto } from '../dtos';
import { type PlannerHiringSummaryEntity } from '../entities';
import { type PlannerHiringRepository } from '../repositories';

export interface GetPlannerHiringByIdUseCase {
  execute: (getByIdDto: GetPlannerHiringByIdDto) => Promise<PlannerHiringSummaryEntity>;
}

export class GetPlannerHiringById implements GetPlannerHiringByIdUseCase {
  constructor(private readonly repository: PlannerHiringRepository) {}

  async execute(getByIdDto: GetPlannerHiringByIdDto): Promise<PlannerHiringSummaryEntity> {
    return await this.repository.getPlannerHiringById(getByIdDto);
  }
}
