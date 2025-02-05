import { type MedicalPatientGetAllResponseEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type MedicalPatientRepository } from '../repositories';

export interface GetMedicalPatientsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>>;
}

export class GetMedicalPatients implements GetMedicalPatientsUseCase {
  constructor(private readonly repository: MedicalPatientRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>> {
    return await this.repository.getAllMedicalPatients(pagination);
  }
}
