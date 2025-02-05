import { type GetMedicalExaminationTypeByIdDto } from '../dtos';
import { type MedicalExaminationTypeGetByIdResponseEntity } from '../entities';
import { type MedicalExaminationTypeRepository } from '../repositories';

export interface GetMedicalExaminationTypeByIdUseCase {
  execute: (getByIdDto: GetMedicalExaminationTypeByIdDto) => Promise<MedicalExaminationTypeGetByIdResponseEntity>;
}

export class GetMedicalExaminationTypeById implements GetMedicalExaminationTypeByIdUseCase {
  constructor(private readonly repository: MedicalExaminationTypeRepository) {}

  async execute(getByIdDto: GetMedicalExaminationTypeByIdDto): Promise<MedicalExaminationTypeGetByIdResponseEntity> {
    return await this.repository.getMedicalExaminationTypeById(getByIdDto);
  }
}
