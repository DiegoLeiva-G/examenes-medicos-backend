import { type GetEmployeeByIdDto } from '../dtos';
import { type EmployeeEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface DeleteEmployeeUseCase {
  execute: (getByIdDto: GetEmployeeByIdDto) => Promise<EmployeeEntity>;
}

export class DeleteEmployee implements DeleteEmployeeUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
