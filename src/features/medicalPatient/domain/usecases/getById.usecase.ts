import { type GetEmployeeByIdDto } from '../dtos';
import { type DoctorEntity } from '../entities';
import { type EmployeeRepository } from '../repositories';

export interface GetEmployeeByIdUseCase {
  execute: (getByIdDto: GetEmployeeByIdDto) => Promise<DoctorEntity>;
}

export class GetEmployeeById implements GetEmployeeByIdUseCase {
  constructor(private readonly repository: EmployeeRepository) {}

  async execute(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
