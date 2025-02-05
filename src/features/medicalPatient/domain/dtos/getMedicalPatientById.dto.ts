import { type MedicalPatientEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetMedicalPatientByIdDto implements CoreDto<GetMedicalPatientByIdDto> {
  private constructor(public readonly data: Pick<MedicalPatientEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetMedicalPatientByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del paciente médico',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<MedicalPatientEntity, 'id'>): GetMedicalPatientByIdDto {
    return new GetMedicalPatientByIdDto(object);
  }
}
