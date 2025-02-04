import { type EmployeeEntity } from '../entities';
import { type UpdateEmployeeDto } from '../dtos';
import { type EmployeeRepository } from '../repositories';

export interface UpdateEmployeeUseCase {
  execute: (data: UpdateEmployeeDto) => Promise<EmployeeEntity>;
}

export class UpdateEmployee implements UpdateEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(data: UpdateEmployeeDto): Promise<EmployeeEntity> {
    return await this.repository.update(data);
  }
}
