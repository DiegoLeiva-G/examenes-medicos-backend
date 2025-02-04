import { type GetPlannerSpecialHiringByIdDto } from '../dtos';
import { type PlannerSpecialHiringGetByIdResponseEntity } from '../entities';
import { type PlannerSpecialHiringRepository } from '../repositories';

export interface GetPlannerSpecialHiringByIdUseCase {
  execute: (getByIdDto: GetPlannerSpecialHiringByIdDto) => Promise<PlannerSpecialHiringGetByIdResponseEntity>;
}

export class GetPlannerSpecialHiringById implements GetPlannerSpecialHiringByIdUseCase {
  constructor(private readonly repository: PlannerSpecialHiringRepository) {}

  async execute(getByIdDto: GetPlannerSpecialHiringByIdDto): Promise<PlannerSpecialHiringGetByIdResponseEntity> {
    return await this.repository.getPlannerSpecialHiringById(getByIdDto);
  }
}
