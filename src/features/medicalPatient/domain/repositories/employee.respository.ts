import { type DoctorEntity, type EmployeeEntityToList } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type CreateEmployeeDto, type GetEmployeeByIdDto, type UpdateEmployeeDto } from '../dtos';

export abstract class EmployeeRepository {
  abstract create(createDto: CreateEmployeeDto): Promise<DoctorEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>>;
  abstract getById(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity>;
  abstract update(updateDto: UpdateEmployeeDto): Promise<DoctorEntity>;
  abstract delete(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity>;
}
