import { type GetMedicalExaminationByIdDto } from '../dtos';
import { type MedicalExaminationDeleteResponseEntity } from '../entities';
import { type MedicalExaminationRepository } from '../repositories';

export interface DeleteMedicalExaminationUseCase {
  execute: (getByIdDto: GetMedicalExaminationByIdDto) => Promise<MedicalExaminationDeleteResponseEntity>;
}

export class DeleteMedicalExamination implements DeleteMedicalExaminationUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(getByIdDto: GetMedicalExaminationByIdDto): Promise<MedicalExaminationDeleteResponseEntity> {
    return await this.repository.deleteMedicalExamination(getByIdDto);
  }
}
