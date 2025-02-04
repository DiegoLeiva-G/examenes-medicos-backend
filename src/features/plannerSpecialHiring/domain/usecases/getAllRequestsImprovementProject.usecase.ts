import {
  type PlannerSpecialHiringEntity,
  type PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
} from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface GetPlannerSpecialHiringRequestsImprovementProjectUseCase {
  execute: (
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ) => Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>>;
}

export class GetPlannerSpecialHiringRequestsImprovementProject
  implements GetPlannerSpecialHiringRequestsImprovementProjectUseCase
{
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>> {
    return await this.repository.getAllPlannerSpecialHiringRequestImprovementProject(pagination, processYear, status);
  }
}
