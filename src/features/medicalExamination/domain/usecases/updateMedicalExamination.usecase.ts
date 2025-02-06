import { type MedicalExaminationUpdateResponseEntity } from '../entities';
import { type UpdateMedicalExaminationDto } from '../dtos';
import { type MedicalExaminationRepository } from '../repositories';

export interface UpdateMedicalExaminationUseCase {
  execute: (data: UpdateMedicalExaminationDto) => Promise<MedicalExaminationUpdateResponseEntity>;
}

export class UpdateMedicalExamination implements UpdateMedicalExaminationUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(data: UpdateMedicalExaminationDto): Promise<MedicalExaminationUpdateResponseEntity> {
    return await this.repository.updateMedicalExamination(data);
  }
}
