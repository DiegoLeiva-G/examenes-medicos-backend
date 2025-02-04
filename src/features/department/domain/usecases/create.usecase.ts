import { type CreateDepartmentDto } from '../dtos';
import { type DepartmentSummaryEntity } from '../entities';
import { type DepartmentRepository } from '../repositories';

export interface CreateDepartmentUseCase {
  execute: (data: CreateDepartmentDto) => Promise<DepartmentSummaryEntity>;
}

export class CreateDepartment implements CreateDepartmentUseCase {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(data: CreateDepartmentDto): Promise<DepartmentSummaryEntity> {
    return await this.repository.create(data);
  }
}
