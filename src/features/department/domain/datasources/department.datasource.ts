import type { CreateDepartmentDto, GetDepartmentByIdDto, UpdateDepartmentDto } from '../dtos';
import type { DepartmentSummaryEntity } from '../entities';

export abstract class DepartmentDatasource {
  abstract create(createDto: CreateDepartmentDto): Promise<DepartmentSummaryEntity>;
  abstract getById(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity>;
  abstract update(updateDto: UpdateDepartmentDto): Promise<DepartmentSummaryEntity>;
  abstract delete(getByIdDto: GetDepartmentByIdDto): Promise<DepartmentSummaryEntity>;
}
