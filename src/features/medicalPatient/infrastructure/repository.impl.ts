import {
  type CreateMedicalPatientDto,
  type MedicalPatientCreateResponseEntity,
  type MedicalPatientDatasource,
  type MedicalPatientDeleteResponseEntity,
  type MedicalPatientGetAllResponseEntity,
  type MedicalPatientGetByIdResponseEntity,
  type MedicalPatientRepository,
  type MedicalPatientUpdateResponseEntity,
  type GetMedicalPatientByIdDto,
  type UpdateMedicalPatientDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class MedicalPatientRepositoryImpl implements MedicalPatientRepository {
  constructor(private readonly datasource: MedicalPatientDatasource) {}

  async getAllMedicalPatients(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>> {
    return await this.datasource.getAllMedicalPatients(pagination);
  }

  async getMedicalPatientById(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientGetByIdResponseEntity> {
    return await this.datasource.getMedicalPatientById(getByIdDto);
  }

  async deleteMedicalPatient(getByIdDto: GetMedicalPatientByIdDto): Promise<MedicalPatientDeleteResponseEntity> {
    return await this.datasource.deleteMedicalPatient(getByIdDto);
  }

  async createMedicalPatient(createDto: CreateMedicalPatientDto): Promise<MedicalPatientCreateResponseEntity> {
    return await this.datasource.createMedicalPatient(createDto);
  }

  async updateMedicalPatient(updateDto: UpdateMedicalPatientDto): Promise<MedicalPatientUpdateResponseEntity> {
    return await this.datasource.updateMedicalPatient(updateDto);
  }
}
