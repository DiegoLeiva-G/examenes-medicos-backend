import {
  type MedicalPatientCreateResponseEntity,
  type MedicalPatientDeleteResponseEntity,
  type MedicalPatientGetAllResponseEntity,
  type MedicalPatientGetByIdResponseEntity,
  type MedicalPatientUpdateResponseEntity,
} from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';
import { type CreateMedicalPatientDto, type GetMedicalPatientByIdDto, type UpdateMedicalPatientDto } from '../dtos';

export abstract class MedicalPatientRepository {
  abstract getAllMedicalPatients(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>>;
  abstract getMedicalPatientById(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientGetByIdResponseEntity>;
  abstract deleteMedicalPatient(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientDeleteResponseEntity>;
  abstract createMedicalPatient(createDto: CreateMedicalPatientDto): Promise<MedicalPatientCreateResponseEntity>;
  abstract updateMedicalPatient(updateDto: UpdateMedicalPatientDto): Promise<MedicalPatientUpdateResponseEntity>;
}
