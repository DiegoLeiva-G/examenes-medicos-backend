import { type DoctorEntity } from '../entities';
import { type UpdateEmployeeDto } from '../dtos';
import { type EmployeeRepository } from '../repositories';

export interface UpdateEmployeeUseCase {
  execute: (data: UpdateEmployeeDto) => Promise<DoctorEntity>;
}

export class UpdateEmployee implements UpdateEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(data: UpdateEmployeeDto): Promise<DoctorEntity> {
    return await this.repository.update(data);
  }
}
