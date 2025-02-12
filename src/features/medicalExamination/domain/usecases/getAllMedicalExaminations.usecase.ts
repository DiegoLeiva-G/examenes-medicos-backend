import { type MedicalExaminationGetAllResponseEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type MedicalExaminationRepository } from '../repositories';

export interface GetMedicalExaminationsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>>;
}

export class GetMedicalExaminations implements GetMedicalExaminationsUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>> {
    return await this.repository.getAllMedicalExaminations(pagination);
  }
}
