import type { CreateEmployeeDto, GetEmployeeByIdDto, UpdateEmployeeDto } from '../dtos';
import type { DoctorEntity, EmployeeEntityToList } from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';

export abstract class EmployeeDatasource {
  abstract create(createDto: CreateEmployeeDto): Promise<DoctorEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>>;
  abstract getById(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity>;
  abstract update(updateDto: UpdateEmployeeDto): Promise<DoctorEntity>;
  abstract delete(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity>;
}
