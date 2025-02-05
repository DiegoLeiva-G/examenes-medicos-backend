import { type MedicalPatientEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { createMedicalPatientSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IOptionalMedicalPatient extends Partial<Omit<MedicalPatientEntity, 'id'>> {}

export class CreateMedicalPatientDto implements CoreDto<CreateMedicalPatientDto> {
  private constructor(public readonly data: IOptionalMedicalPatient) {
    this.validate(this);
  }

  public validate(dto: CreateMedicalPatientDto): void {
    const validationResult = createMedicalPatientSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<MedicalPatientEntity, 'id'> {
    return createMedicalPatientSchema.parse(this.data) as Omit<MedicalPatientEntity, 'id'>;
  }

  public static create(object: IOptionalMedicalPatient): CreateMedicalPatientDto {
    return new CreateMedicalPatientDto(object);
  }
}
