import { type GetPlannerSpecialHiringByIdDto } from '../dtos';
import { type PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity } from '../entities';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface GetPlannerSpecialHiringRequestDetailImprovementProjectByIdUseCase {
  execute: (
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ) => Promise<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity>;
}

export class GetPlannerSpecialHiringRequestDetailImprovementProjectById
  implements GetPlannerSpecialHiringRequestDetailImprovementProjectByIdUseCase
{
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity> {
    return await this.repository.getPlannerSpecialHiringRequestDetailImprovementProjectById(getByIdDto);
  }
}
