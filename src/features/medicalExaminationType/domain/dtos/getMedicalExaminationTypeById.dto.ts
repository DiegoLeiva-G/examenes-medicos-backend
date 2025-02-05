import { type MedicalExaminationTypeEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetMedicalExaminationTypeByIdDto implements CoreDto<GetMedicalExaminationTypeByIdDto> {
  private constructor(public readonly data: Pick<MedicalExaminationTypeEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetMedicalExaminationTypeByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<MedicalExaminationTypeEntity, 'id'>): GetMedicalExaminationTypeByIdDto {
    return new GetMedicalExaminationTypeByIdDto(object);
  }
}
