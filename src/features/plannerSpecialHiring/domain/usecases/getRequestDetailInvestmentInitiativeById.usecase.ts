import { type GetPlannerSpecialHiringByIdDto } from '../dtos';
import { type PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity } from '../entities';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface GetPlannerSpecialHiringRequestDetailInvestmentInitiativeByIdUseCase {
  execute: (
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ) => Promise<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity>;
}

export class GetPlannerSpecialHiringRequestDetailInvestmentInitiativeById
  implements GetPlannerSpecialHiringRequestDetailInvestmentInitiativeByIdUseCase
{
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(
    getByIdDto: GetPlannerSpecialHiringByIdDto,
  ): Promise<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity> {
    return await this.repository.getPlannerSpecialHiringRequestDetailInvestmentInitiativeById(getByIdDto);
  }
}
