import { type MedicalExaminationTypeGetAllResponseEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type MedicalExaminationTypeRepository } from '../repositories';

export interface GetMedicalExaminationTypesUseCase {
  execute: (
    pagination: PaginationDto,
  ) => Promise<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>>;
}

export class GetMedicalExaminationTypes implements GetMedicalExaminationTypesUseCase {
  constructor(private readonly repository: MedicalExaminationTypeRepository) {}

  async execute(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>> {
    return await this.repository.getAllMedicalExaminationTypes(pagination);
  }
}
