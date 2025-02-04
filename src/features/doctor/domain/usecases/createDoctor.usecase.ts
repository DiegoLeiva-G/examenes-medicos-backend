import { type CreateDoctorDto } from '../dtos';
import { type DoctorCreateResponseEntity } from '../entities';
import { type DoctorRepository } from '../repositories';

export interface CreateDoctorUseCase {
  execute: (data: CreateDoctorDto) => Promise<DoctorCreateResponseEntity>;
}

export class CreateDoctor implements CreateDoctorUseCase {
  constructor(private readonly repository: DoctorRepository) {}

  async execute(data: CreateDoctorDto): Promise<DoctorCreateResponseEntity> {
    return await this.repository.createDoctor(data);
  }
}
