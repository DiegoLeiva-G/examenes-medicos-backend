import { type MedicalPatientUpdateResponseEntity } from '../entities';
import { type UpdateMedicalPatientDto } from '../dtos';
import { type MedicalPatientRepository } from '../repositories';

export interface UpdateMedicalPatientUseCase {
  execute: (data: UpdateMedicalPatientDto) => Promise<MedicalPatientUpdateResponseEntity>;
}

export class UpdateMedicalPatient implements UpdateMedicalPatientUseCase {
  constructor(private readonly repository: MedicalPatientRepository) {}

  async execute(data: UpdateMedicalPatientDto): Promise<MedicalPatientUpdateResponseEntity> {
    return await this.repository.updateMedicalPatient(data);
  }
}
