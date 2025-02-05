import { type MedicalExaminationTypeUpdateResponseEntity } from '../entities';
import { type UpdateMedicalExaminationTypeDto } from '../dtos';
import { type MedicalExaminationTypeRepository } from '../repositories';

export interface UpdateMedicalExaminationTypeUseCase {
  execute: (data: UpdateMedicalExaminationTypeDto) => Promise<MedicalExaminationTypeUpdateResponseEntity>;
}

export class UpdateMedicalExaminationType implements UpdateMedicalExaminationTypeUseCase {
  constructor(private readonly repository: MedicalExaminationTypeRepository) {}

  async execute(data: UpdateMedicalExaminationTypeDto): Promise<MedicalExaminationTypeUpdateResponseEntity> {
    return await this.repository.updateMedicalExaminationType(data);
  }
}
