import { type GetEmployeeByIdDto } from '../dtos';
import { type DoctorEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface DeleteEmployeeUseCase {
  execute: (getByIdDto: GetEmployeeByIdDto) => Promise<DoctorEntity>;
}

export class DeleteEmployee implements DeleteEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
