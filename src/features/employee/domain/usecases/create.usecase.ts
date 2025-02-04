import { type CreateEmployeeDto } from '../dtos';
import { type EmployeeEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface CreateEmployeeUseCase {
  execute: (data: CreateEmployeeDto) => Promise<EmployeeEntity>;
}

export class CreateEmployee implements CreateEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(data: CreateEmployeeDto): Promise<EmployeeEntity> {
    return await this.repository.create(data);
  }
}
