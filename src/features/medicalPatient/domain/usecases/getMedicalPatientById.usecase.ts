import { type GetMedicalPatientByIdDto } from '../dtos';
import { type MedicalPatientGetByIdResponseEntity } from '../entities';
import { type MedicalPatientRepository } from '../repositories';

export interface GetMedicalPatientByIdUseCase {
  execute: (getByIdDto: GetMedicalPatientByIdDto) => Promise<MedicalPatientGetByIdResponseEntity>;
}

export class GetMedicalPatientById implements GetMedicalPatientByIdUseCase {
  constructor(private readonly repository: MedicalPatientRepository) {}

  async execute(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientGetByIdResponseEntity> {
    return await this.repository.getMedicalPatientById(getByIdDto);
  }
}
