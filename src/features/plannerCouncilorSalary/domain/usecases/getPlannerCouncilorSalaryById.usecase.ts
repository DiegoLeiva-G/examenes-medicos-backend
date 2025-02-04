import { type GetPlannerCouncilorSalaryByIdDto } from '../dtos';
import { type PlannerCouncilorSalaryGetByIdResponseEntity } from '../entities';
import { type PlannerCouncilorSalaryRepository } from '../repositories';

export interface GetPlannerCouncilorSalaryByIdUseCase {
  execute: (getByIdDto: GetPlannerCouncilorSalaryByIdDto) => Promise<PlannerCouncilorSalaryGetByIdResponseEntity>;
}

export class GetPlannerCouncilorSalaryById implements GetPlannerCouncilorSalaryByIdUseCase {
  constructor(private readonly repository: PlannerCouncilorSalaryRepository) {}

  async execute(getByIdDto: GetPlannerCouncilorSalaryByIdDto): Promise<PlannerCouncilorSalaryGetByIdResponseEntity> {
    return await this.repository.getPlannerCouncilorSalaryById(getByIdDto);
  }
}
