import { type MedicalExaminationEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class DeleteMedicalExaminationByIdDto implements CoreDto<DeleteMedicalExaminationByIdDto> {
  private constructor(public readonly data: Pick<MedicalExaminationEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: DeleteMedicalExaminationByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<MedicalExaminationEntity, 'id'>): DeleteMedicalExaminationByIdDto {
    return new DeleteMedicalExaminationByIdDto(object);
  }
}
