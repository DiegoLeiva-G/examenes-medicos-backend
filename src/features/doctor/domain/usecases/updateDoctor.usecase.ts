import { type DoctorUpdateResponseEntity } from '../entities';
import { type UpdateDoctorDto } from '../dtos';
import { type DoctorRepository } from '../repositories';

export interface UpdateDoctorUseCase {
  execute: (data: UpdateDoctorDto) => Promise<DoctorUpdateResponseEntity>;
}

export class UpdateDoctor implements UpdateDoctorUseCase {
  constructor(private readonly repository: DoctorRepository) {}

  async execute(data: UpdateDoctorDto): Promise<DoctorUpdateResponseEntity> {
    return await this.repository.updateDoctor(data);
  }
}
