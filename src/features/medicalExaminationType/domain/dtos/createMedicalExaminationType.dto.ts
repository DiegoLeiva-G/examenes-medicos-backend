import { type MedicalExaminationTypeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { createMedicalExaminationTypeSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IOptionalMedicalExaminationType extends Partial<Omit<MedicalExaminationTypeEntity, 'id'>> {}

export class CreateMedicalExaminationTypeDto implements CoreDto<CreateMedicalExaminationTypeDto> {
  private constructor(public readonly data: IOptionalMedicalExaminationType) {
    this.validate(this);
  }

  public validate(dto: CreateMedicalExaminationTypeDto): void {
    const validationResult = createMedicalExaminationTypeSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<MedicalExaminationTypeEntity, 'id'> {
    return createMedicalExaminationTypeSchema.parse(this.data) as Omit<MedicalExaminationTypeEntity, 'id'>;
  }

  public static create(object: IOptionalMedicalExaminationType): CreateMedicalExaminationTypeDto {
    return new CreateMedicalExaminationTypeDto(object);
  }
}
