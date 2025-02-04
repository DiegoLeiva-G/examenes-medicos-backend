import {
  type CreateEmployeeDto,
  type EmployeeDatasource,
  type EmployeeEntity,
  type EmployeeEntityToList,
  type EmployeeRepository,
  type GetEmployeeByIdDto,
  type UpdateEmployeeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(private readonly datasource: EmployeeDatasource) {}

  async create(createDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateEmployeeDto): Promise<EmployeeEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
