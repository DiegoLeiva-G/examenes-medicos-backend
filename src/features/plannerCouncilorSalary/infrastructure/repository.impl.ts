import {
  type CreatePlannerCouncilorSalaryDto,
  type PlannerCouncilorSalaryCreateResponseEntity,
  type PlannerCouncilorSalaryGetByIdResponseEntity,
  type GetPlannerCouncilorSalaryByIdDto,
  type PlannerCouncilorSalaryRepository,
  type PlannerCouncilorSalaryDatasource,
} from '../domain';

export class PlannerCouncilorSalaryRepositoryImpl implements PlannerCouncilorSalaryRepository {
  constructor(private readonly datasource: PlannerCouncilorSalaryDatasource) {}

  async createPlannerCouncilorSalary(
    createDto: CreatePlannerCouncilorSalaryDto,
  ): Promise<PlannerCouncilorSalaryCreateResponseEntity> {
    return await this.datasource.createPlannerCouncilorSalary(createDto);
  }

  async getPlannerCouncilorSalaryById(
    getByIdDto: GetPlannerCouncilorSalaryByIdDto,
  ): Promise<PlannerCouncilorSalaryGetByIdResponseEntity> {
    return await this.datasource.getPlannerCouncilorSalaryById(getByIdDto);
  }
}
