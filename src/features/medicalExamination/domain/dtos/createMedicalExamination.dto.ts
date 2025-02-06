import { type MedicalExaminationEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { createMedicalExaminationSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IOptionalMedicalExamination extends Partial<Omit<MedicalExaminationEntity, 'id'>> {}

export class CreateMedicalExaminationDto implements CoreDto<CreateMedicalExaminationDto> {
  private constructor(public readonly data: IOptionalMedicalExamination) {
    this.validate(this);
  }

  public validate(dto: CreateMedicalExaminationDto): void {
    const validationResult = createMedicalExaminationSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<MedicalExaminationEntity, 'id'> {
    return createMedicalExaminationSchema.parse(this.data) as Omit<MedicalExaminationEntity, 'id'>;
  }

  public static create(object: IOptionalMedicalExamination): CreateMedicalExaminationDto {
    return new CreateMedicalExaminationDto(object);
  }
}
