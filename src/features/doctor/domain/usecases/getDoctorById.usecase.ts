import { type GetDoctorByIdDto } from '../dtos';
import { type DoctorGetByIdResponseEntity } from '../entities';
import { type DoctorRepository } from '../repositories';

export interface GetDoctorByIdUseCase {
  execute: (getByIdDto: GetDoctorByIdDto) => Promise<DoctorGetByIdResponseEntity>;
}

export class GetDoctorById implements GetDoctorByIdUseCase {
  constructor(private readonly repository: DoctorRepository) {}

  async execute(getByIdDto: GetDoctorByIdDto): Promise<DoctorGetByIdResponseEntity> {
    return await this.repository.getDoctorById(getByIdDto);
  }
}
