import { type MedicalExaminationTypeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { updateMedicalExaminationTypeSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IMedicalExaminationType extends Partial<MedicalExaminationTypeEntity> {}

export class UpdateMedicalExaminationTypeDto implements CoreDto<UpdateMedicalExaminationTypeDto> {
  private constructor(public readonly data: IMedicalExaminationType) {
    this.validate(this);
  }

  public validate(dto: UpdateMedicalExaminationTypeDto): void {
    const validationResult = updateMedicalExaminationTypeSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del tipo de examen médico',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IMedicalExaminationType {
    return updateMedicalExaminationTypeSchema.parse(this.data) as IMedicalExaminationType;
  }

  public static create(object: IMedicalExaminationType): UpdateMedicalExaminationTypeDto {
    return new UpdateMedicalExaminationTypeDto(object);
  }
}
