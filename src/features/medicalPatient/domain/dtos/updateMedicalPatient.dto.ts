import { type MedicalPatientEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { updateMedicalPatientSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IMedicalPatient extends Partial<MedicalPatientEntity> {}

export class UpdateMedicalPatientDto implements CoreDto<UpdateMedicalPatientDto> {
  private constructor(public readonly data: IMedicalPatient) {
    this.validate(this);
  }

  public validate(dto: UpdateMedicalPatientDto): void {
    const validationResult = updateMedicalPatientSchema.safeParse(dto.data);

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

  public getValidatedData(): IMedicalPatient {
    return updateMedicalPatientSchema.parse(this.data) as IMedicalPatient;
  }

  public static create(object: IMedicalPatient): UpdateMedicalPatientDto {
    return new UpdateMedicalPatientDto(object);
  }
}
