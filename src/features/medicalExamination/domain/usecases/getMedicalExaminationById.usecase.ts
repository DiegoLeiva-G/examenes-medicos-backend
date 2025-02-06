import { type GetMedicalExaminationByIdDto } from '../dtos';
import { type MedicalExaminationGetByIdResponseEntity } from '../entities';
import { type MedicalExaminationRepository } from '../repositories';

export interface GetMedicalExaminationByIdUseCase {
  execute: (getByIdDto: GetMedicalExaminationByIdDto) => Promise<MedicalExaminationGetByIdResponseEntity>;
}

export class GetMedicalExaminationById implements GetMedicalExaminationByIdUseCase {
  constructor(private readonly repository: MedicalExaminationRepository) {}

  async execute(getByIdDto: GetMedicalExaminationByIdDto): Promise<MedicalExaminationGetByIdResponseEntity> {
    return await this.repository.getMedicalExaminationById(getByIdDto);
  }
}
