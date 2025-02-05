import { type GetMedicalExaminationTypeByIdDto } from '../dtos';
import { type MedicalExaminationTypeDeleteResponseEntity } from '../entities';
import { type MedicalExaminationTypeRepository } from '../repositories';

export interface DeleteMedicalExaminationTypeUseCase {
  execute: (getByIdDto: GetMedicalExaminationTypeByIdDto) => Promise<MedicalExaminationTypeDeleteResponseEntity>;
}

export class DeleteMedicalExaminationType implements DeleteMedicalExaminationTypeUseCase {
  constructor(private readonly repository: MedicalExaminationTypeRepository) {}

  async execute(getByIdDto: GetMedicalExaminationTypeByIdDto): Promise<MedicalExaminationTypeDeleteResponseEntity> {
    return await this.repository.deleteMedicalExaminationType(getByIdDto);
  }
}
