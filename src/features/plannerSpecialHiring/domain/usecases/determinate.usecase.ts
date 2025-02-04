import { type DeterminatePlannerSpecialHiringDto } from '../dtos';
import { type PlannerSpecialHiringRequestDeterminationResponseEntity } from '../entities';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface DeterminatePlannerSpecialHiringUseCase {
  execute: (
    data: DeterminatePlannerSpecialHiringDto,
  ) => Promise<PlannerSpecialHiringRequestDeterminationResponseEntity>;
}

export class DeterminatePlannerSpecialHiring implements DeterminatePlannerSpecialHiringUseCase {
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(
    data: DeterminatePlannerSpecialHiringDto,
  ): Promise<PlannerSpecialHiringRequestDeterminationResponseEntity> {
    return await this.repository.determinatePlannerSpecialHiring(data);
  }
}
