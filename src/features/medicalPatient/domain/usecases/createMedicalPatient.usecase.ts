import { type CreateMedicalPatientDto } from '../dtos';
import { type MedicalPatientCreateResponseEntity } from '../entities';
import { type MedicalPatientRepository } from '../repositories';

export interface CreateMedicalPatientUseCase {
  execute: (data: CreateMedicalPatientDto) => Promise<MedicalPatientCreateResponseEntity>;
}

export class CreateMedicalPatient implements CreateMedicalPatientUseCase {
  constructor(private readonly repository: MedicalPatientRepository) {}

  async execute(data: CreateMedicalPatientDto): Promise<MedicalPatientCreateResponseEntity> {
    return await this.repository.createMedicalPatient(data);
  }
}
