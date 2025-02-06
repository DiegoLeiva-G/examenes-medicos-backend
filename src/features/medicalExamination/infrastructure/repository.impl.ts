import {
  type CreateMedicalExaminationDto,
  type MedicalExaminationCreateResponseEntity,
  type MedicalExaminationDatasource,
  type MedicalExaminationDeleteResponseEntity,
  type MedicalExaminationGetAllResponseEntity,
  type MedicalExaminationGetByIdResponseEntity,
  type MedicalExaminationRepository,
  type MedicalExaminationUpdateResponseEntity,
  type GetMedicalExaminationByIdDto,
  type UpdateMedicalExaminationDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import type { MedicalExaminationTypeEntity } from '../../medicalExaminationType';

export class MedicalExaminationRepositoryImpl implements MedicalExaminationRepository {
  constructor(private readonly datasource: MedicalExaminationDatasource) {}

  async getAllMedicalExaminations(
    pagination: PaginationDto,
    type: Array<MedicalExaminationTypeEntity['type']>,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>> {
    return await this.datasource.getAllMedicalExaminations(pagination, type);
  }

  async getMedicalExaminationById(
    getByIdDto: GetMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationGetByIdResponseEntity> {
    return await this.datasource.getMedicalExaminationById(getByIdDto);
  }

  async deleteMedicalExamination(
    getByIdDto: GetMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationDeleteResponseEntity> {
    return await this.datasource.deleteMedicalExamination(getByIdDto);
  }

  async createMedicalExamination(
    createDto: CreateMedicalExaminationDto,
  ): Promise<MedicalExaminationCreateResponseEntity> {
    return await this.datasource.createMedicalExamination(createDto);
  }

  async updateMedicalExamination(
    updateDto: UpdateMedicalExaminationDto,
  ): Promise<MedicalExaminationUpdateResponseEntity> {
    return await this.datasource.updateMedicalExamination(updateDto);
  }
}
