import { type CreatePlannerCouncilorSalaryDto } from '../dtos';
import { type PlannerCouncilorSalaryCreateResponseEntity } from '../entities';
import { type PlannerCouncilorSalaryRepository } from '../repositories';

export interface CreatePlannerCouncilorSalaryUseCase {
  execute: (data: CreatePlannerCouncilorSalaryDto) => Promise<PlannerCouncilorSalaryCreateResponseEntity>;
}

export class CreatePlannerCouncilorSalary implements CreatePlannerCouncilorSalaryUseCase {
  constructor(private readonly repository: PlannerCouncilorSalaryRepository) {}

  async execute(data: CreatePlannerCouncilorSalaryDto): Promise<PlannerCouncilorSalaryCreateResponseEntity> {
    return await this.repository.createPlannerCouncilorSalary(data);
  }
}
