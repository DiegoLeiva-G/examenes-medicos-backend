import { type CreatePlannerCouncilorSalaryDto, type GetPlannerCouncilorSalaryByIdDto } from '../dtos';
import {
  type PlannerCouncilorSalaryCreateResponseEntity,
  type PlannerCouncilorSalaryGetByIdResponseEntity,
} from '../entities';

// TODO: add delete and update
export abstract class PlannerCouncilorSalaryRepository {
  abstract createPlannerCouncilorSalary(
    createDto: CreatePlannerCouncilorSalaryDto,
  ): Promise<PlannerCouncilorSalaryCreateResponseEntity>;
  abstract getPlannerCouncilorSalaryById(
    getByIdDto: GetPlannerCouncilorSalaryByIdDto,
  ): Promise<PlannerCouncilorSalaryGetByIdResponseEntity>;
}
