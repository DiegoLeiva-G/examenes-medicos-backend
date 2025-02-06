import { type MedicalExaminationEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { updateMedicalExaminationSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IMedicalMedicalExamination extends Partial<MedicalExaminationEntity> {}

export class UpdateMedicalExaminationDto implements CoreDto<UpdateMedicalExaminationDto> {
  private constructor(public readonly data: IMedicalMedicalExamination) {
    this.validate(this);
  }

  public validate(dto: UpdateMedicalExaminationDto): void {
    const validationResult = updateMedicalExaminationSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del exámen médico',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IMedicalMedicalExamination {
    return updateMedicalExaminationSchema.parse(this.data) as IMedicalMedicalExamination;
  }

  public static create(object: IMedicalMedicalExamination): UpdateMedicalExaminationDto {
    return new UpdateMedicalExaminationDto(object);
  }
}
