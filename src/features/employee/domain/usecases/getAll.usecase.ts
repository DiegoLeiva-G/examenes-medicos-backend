import { type EmployeeEntityToList } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type EmployeeRepository } from '../repositories';

export interface GetEmployeesUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<EmployeeEntityToList[]>>;
}

export class GetEmployees implements GetEmployeesUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>> {
    return await this.repository.getAll(pagination);
  }
}
