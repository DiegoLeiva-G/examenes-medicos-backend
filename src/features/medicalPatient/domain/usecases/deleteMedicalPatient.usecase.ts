import { type GetMedicalPatientByIdDto } from '../dtos';
import { type MedicalPatientDeleteResponseEntity } from '../entities';
import { type MedicalPatientRepository } from '../repositories';

export interface DeleteMedicalPatientUseCase {
  execute: (getByIdDto: GetMedicalPatientByIdDto) => Promise<MedicalPatientDeleteResponseEntity>;
}

export class DeleteMedicalPatient implements DeleteMedicalPatientUseCase {
  constructor(private readonly repository: MedicalPatientRepository) {}

  async execute(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientDeleteResponseEntity> {
    return await this.repository.deleteMedicalPatient(getByIdDto);
  }
}
