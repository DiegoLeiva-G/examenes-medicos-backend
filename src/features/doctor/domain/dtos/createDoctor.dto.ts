import { type DoctorEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { createDoctorSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IOptionalDoctor extends Partial<Omit<DoctorEntity, 'id'>> {}

export class CreateDoctorDto implements CoreDto<CreateDoctorDto> {
  private constructor(public readonly data: IOptionalDoctor) {
    this.validate(this);
  }

  public validate(dto: CreateDoctorDto): void {
    const validationResult = createDoctorSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del doctor',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<DoctorEntity, 'id'> {
    return createDoctorSchema.parse(this.data) as Omit<DoctorEntity, 'id'>;
  }

  public static create(object: IOptionalDoctor): CreateDoctorDto {
    return new CreateDoctorDto(object);
  }
}
