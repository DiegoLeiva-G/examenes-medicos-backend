import {
  type PlannerSpecialHiringEntity,
  type PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
} from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface GetPlannerSpecialHiringRequestsInvestmentInitiativeUseCase {
  execute: (
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ) => Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>>;
}

export class GetPlannerSpecialHiringRequestsInvestmentInitiative
  implements GetPlannerSpecialHiringRequestsInvestmentInitiativeUseCase
{
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(
    pagination: PaginationDto,
    processYear: number,
    status: PlannerSpecialHiringEntity['status'],
  ): Promise<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>> {
    return await this.repository.getAllPlannerSpecialHiringRequestInvestmentInitiative(pagination, processYear, status);
  }
}
