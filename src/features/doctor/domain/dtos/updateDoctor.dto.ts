import { type DoctorEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { updateDoctorSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IDoctor extends Partial<DoctorEntity> {}

export class UpdateDoctorDto implements CoreDto<UpdateDoctorDto> {
  private constructor(public readonly data: IDoctor) {
    this.validate(this);
  }

  public validate(dto: UpdateDoctorDto): void {
    const validationResult = updateDoctorSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del médico',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IDoctor {
    return updateDoctorSchema.parse(this.data) as IDoctor;
  }

  public static create(object: IDoctor): UpdateDoctorDto {
    return new UpdateDoctorDto(object);
  }
}
