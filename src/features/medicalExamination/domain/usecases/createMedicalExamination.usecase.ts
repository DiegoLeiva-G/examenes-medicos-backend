import { type CreateMedicalExaminationDto } from '../dtos';
import { type MedicalExaminationCreateResponseEntity } from '../entities';
import { type MedicalExaminationRepository } from '../repositories';

export interface CreateMedicalExaminationUseCase {
  execute: (data: CreateMedicalExaminationDto) => Promise<MedicalExaminationCreateResponseEntity>;
}

export class CreateMedicalExamination implements CreateMedicalExaminationUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(data: CreateMedicalExaminationDto): Promise<MedicalExaminationCreateResponseEntity> {
    return await this.repository.createMedicalExamination(data);
  }
}
