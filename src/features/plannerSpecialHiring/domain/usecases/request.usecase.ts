import { type RequestPlannerSpecialHiringDto } from '../dtos';
import { type PlannerSpecialHiringRequestResponseEntity } from '../entities';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface RequestPlannerSpecialHiringUseCase {
  execute: (data: RequestPlannerSpecialHiringDto) => Promise<PlannerSpecialHiringRequestResponseEntity>;
}

export class RequestPlannerSpecialHiring implements RequestPlannerSpecialHiringUseCase {
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(data: RequestPlannerSpecialHiringDto): Promise<PlannerSpecialHiringRequestResponseEntity> {
    return await this.repository.requestPlannerSpecialHiring(data);
  }
}
