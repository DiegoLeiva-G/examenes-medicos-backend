import {
  type MedicalExaminationTypeCreateResponseEntity,
  type MedicalExaminationTypeDeleteResponseEntity,
  type MedicalExaminationTypeGetAllResponseEntity,
  type MedicalExaminationTypeGetByIdResponseEntity,
  type MedicalExaminationTypeUpdateResponseEntity,
} from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';
import {
  type CreateMedicalExaminationTypeDto,
  type GetMedicalExaminationTypeByIdDto,
  type UpdateMedicalExaminationTypeDto,
} from '../dtos';

export abstract class MedicalExaminationTypeRepository {
  abstract getAllMedicalExaminationTypes(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>>;
  abstract getMedicalExaminationTypeById(
    getByIdDto: GetMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeGetByIdResponseEntity>;
  abstract deleteMedicalExaminationType(
    getByIdDto: GetMedicalExaminationTypeByIdDto,
  ): Promise<MedicalExaminationTypeDeleteResponseEntity>;
  abstract createMedicalExaminationType(
    createDto: CreateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeCreateResponseEntity>;
  abstract updateMedicalExaminationType(
    updateDto: UpdateMedicalExaminationTypeDto,
  ): Promise<MedicalExaminationTypeUpdateResponseEntity>;
}
