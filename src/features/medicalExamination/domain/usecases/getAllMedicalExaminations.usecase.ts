import { type MedicalExaminationGetAllResponseEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type MedicalExaminationRepository } from '../repositories';
import type { MedicalExaminationTypeEntity } from '../../../medicalExaminationType';

export interface GetMedicalExaminationsUseCase {
  execute: (
    pagination: PaginationDto,
    type: Array<MedicalExaminationTypeEntity['type']>,
  ) => Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>>;
}

export class GetMedicalExaminations implements GetMedicalExaminationsUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(
    pagination: PaginationDto,
    type: Array<MedicalExaminationTypeEntity['type']>,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>> {
    return await this.repository.getAllMedicalExaminations(pagination, type);
  }
}
