import type { CreateEmployeeDto, GetEmployeeByIdDto, UpdateEmployeeDto } from '../dtos';
import type { EmployeeEntity, EmployeeEntityToList } from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';

export abstract class EmployeeDatasource {
  abstract create(createDto: CreateEmployeeDto): Promise<EmployeeEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>>;
  abstract getById(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity>;
  abstract update(updateDto: UpdateEmployeeDto): Promise<EmployeeEntity>;
  abstract delete(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity>;
}
