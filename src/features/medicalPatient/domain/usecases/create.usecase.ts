import { type CreateEmployeeDto } from '../dtos';
import { type DoctorEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface CreateEmployeeUseCase {
  execute: (data: CreateEmployeeDto) => Promise<DoctorEntity>;
}

export class CreateEmployee implements CreateEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(data: CreateEmployeeDto): Promise<DoctorEntity> {
    return await this.repository.create(data);
  }
}
