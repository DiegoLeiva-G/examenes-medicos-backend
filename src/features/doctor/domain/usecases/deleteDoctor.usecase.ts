import { type GetDoctorByIdDto } from '../dtos';
import { type DoctorDeleteResponseEntity } from '../entities';
import { type DoctorRepository } from '../repositories';

export interface DeleteDoctorUseCase {
  execute: (getByIdDto: GetDoctorByIdDto) => Promise<DoctorDeleteResponseEntity>;
}

export class DeleteDoctor implements DeleteDoctorUseCase {
  constructor(private readonly repository: DoctorRepository) {}

  async execute(getByIdDto: GetDoctorByIdDto): Promise<DoctorDeleteResponseEntity> {
    return await this.repository.deleteDoctor(getByIdDto);
  }
}
