import { type EmployeeEntity, type EmployeeEntityToList } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type CreateEmployeeDto, type GetEmployeeByIdDto, type UpdateEmployeeDto } from '../dtos';

export abstract class EmployeeRepository {
  abstract create(createDto: CreateEmployeeDto): Promise<EmployeeEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>>;
  abstract getById(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity>;
  abstract update(updateDto: UpdateEmployeeDto): Promise<EmployeeEntity>;
  abstract delete(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity>;
}
