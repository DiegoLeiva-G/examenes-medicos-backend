import { type CreateMedicalExaminationTypeDto } from '../dtos';
import { type MedicalExaminationTypeCreateResponseEntity } from '../entities';
import { type MedicalExaminationTypeRepository } from '../repositories';

export interface CreateMedicalExaminationTypeUseCase {
  execute: (data: CreateMedicalExaminationTypeDto) => Promise<MedicalExaminationTypeCreateResponseEntity>;
}

export class CreateMedicalExaminationType implements CreateMedicalExaminationTypeUseCase {
  constructor(private readonly repository: MedicalExaminationTypeRepository) {}

  async execute(data: CreateMedicalExaminationTypeDto): Promise<MedicalExaminationTypeCreateResponseEntity> {
    return await this.repository.createMedicalExaminationType(data);
  }
}
