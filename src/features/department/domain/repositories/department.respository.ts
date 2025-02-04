import { type CreateDepartmentDto, type GetDepartmentByIdDto, type UpdateDepartmentDto } from '../dtos';
import { type DepartmentSummaryEntity } from '../entities';

export abstract class DepartmentRepository {
  abstract create(createDto: CreateDepartmentDto): Promise<DepartmentSummaryEntity>;
  abstract getById(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity>;
  abstract update(updateDto: UpdateDepartmentDto): Promise<DepartmentSummaryEntity>;
  abstract delete(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity>;
}
