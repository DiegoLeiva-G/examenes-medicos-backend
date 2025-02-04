import { type GetEmployeeByIdDto } from '../dtos';
import { type EmployeeEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface GetEmployeeByIdUseCase {
  execute: (getByIdDto: GetEmployeeByIdDto) => Promise<EmployeeEntity>;
}

export class GetEmployeeById implements GetEmployeeByIdUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(getByIdDto: GetEmployeeByIdDto): Promise<EmployeeEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
