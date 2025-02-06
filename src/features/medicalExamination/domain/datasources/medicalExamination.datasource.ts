import {
  type MedicalExaminationCreateResponseEntity,
  type MedicalExaminationDeleteResponseEntity,
  type MedicalExaminationGetAllResponseEntity,
  type MedicalExaminationGetByIdResponseEntity,
  type MedicalExaminationUpdateResponseEntity,
} from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';
import {
  type CreateMedicalExaminationDto,
  type GetMedicalExaminationByIdDto,
  type UpdateMedicalExaminationDto,
} from '../dtos';
import { type MedicalExaminationTypeEntity } from '../../../medicalExaminationType';

export abstract class MedicalExaminationDatasource {
  abstract getAllMedicalExaminations(
    pagination: PaginationDto,
    type: Array<MedicalExaminationTypeEntity['type']>,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>>;
  abstract getMedicalExaminationById(
    getByIdDto: GetMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationGetByIdResponseEntity>;
  abstract deleteMedicalExamination(
    getByIdDto: GetMedicalExaminationByIdDto,
  ): Promise<MedicalExaminationDeleteResponseEntity>;
  abstract createMedicalExamination(
    createDto: CreateMedicalExaminationDto,
  ): Promise<MedicalExaminationCreateResponseEntity>;
  abstract updateMedicalExamination(
    updateDto: UpdateMedicalExaminationDto,
  ): Promise<MedicalExaminationUpdateResponseEntity>;
}
