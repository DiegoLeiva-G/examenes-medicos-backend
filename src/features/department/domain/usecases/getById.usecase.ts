import { type GetDepartmentByIdDto } from '../dtos';
import { type DepartmentSummaryEntity } from '../entities';
import { type DepartmentRepository } from '../repositories';

export interface GetDepartmentByIdUseCase {
  execute: (getByIdDto: GetDepartmentByIdDto) => Promise<DepartmentSummaryEntity>;
}

export class GetDepartmentById implements GetDepartmentByIdUseCase {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
