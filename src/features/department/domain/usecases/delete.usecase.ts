import { type GetDepartmentByIdDto } from '../dtos';
import { type DepartmentSummaryEntity } from '../entities';
import { type DepartmentRepository } from '../repositories';

export interface DeleteDepartmentUseCase {
  execute: (getByIdDto: GetDepartmentByIdDto) => Promise<DepartmentSummaryEntity>;
}

export class DeleteDepartment implements DeleteDepartmentUseCase {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
