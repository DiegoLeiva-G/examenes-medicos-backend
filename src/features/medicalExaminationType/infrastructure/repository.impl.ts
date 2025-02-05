import {
  type CreateMedicalExaminationTypeDto,
  type MedicalExaminationTypeCreateResponseEntity,
  type MedicalExaminationTypeDatasource,
  type MedicalExaminationTypeDeleteResponseEntity,
  type MedicalExaminationTypeGetAllResponseEntity,
  type MedicalExaminationTypeGetByIdResponseEntity,
  type MedicalExaminationTypeRepository,
  type MedicalExaminationTypeUpdateResponseEntity,
  type GetMedicalExaminationTypeByIdDto,
  type UpdateMedicalExaminationTypeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class MedicalExaminationTypeRepositoryImpl implements MedicalExaminationTypeRepository {
  constructor(private readonly datasource: MedicalExaminationTypeDatasource) {}

  async getAllMedicalExaminationTypes(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>> {
    return await this.datasource.getAllMedicalExaminationTypes(pagination);
  }

  async getMedicalExaminationTypeById(
    getByIdDto: GetMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeGetByIdResponseEntity> {
    return await this.datasource.getMedicalExaminationTypeById(getByIdDto);
  }

  async deleteMedicalExaminationType(
    getByIdDto: GetMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeDeleteResponseEntity> {
    return await this.datasource.deleteMedicalExaminationType(getByIdDto);
  }

  async createMedicalExaminationType(
    createDto: CreateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeCreateResponseEntity> {
    return await this.datasource.createMedicalExaminationType(createDto);
  }

  async updateMedicalExaminationType(
    updateDto: UpdateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeUpdateResponseEntity> {
    return await this.datasource.updateMedicalExaminationType(updateDto);
  }
}
