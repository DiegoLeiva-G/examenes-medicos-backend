import { type UpdateDepartmentDto } from '../dtos';
import { type DepartmentSummaryEntity } from '../entities';
import { type DepartmentRepository } from '../repositories';

export interface UpdateDepartmentUseCase {
  execute: (data: UpdateDepartmentDto) => Promise<DepartmentSummaryEntity>;
}

export class UpdateDepartment implements UpdateDepartmentUseCase {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(data: UpdateDepartmentDto): Promise<DepartmentSummaryEntity> {
    return await this.repository.update(data);
  }
}
