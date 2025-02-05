import { type DoctorEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class DeleteDoctorByIdDto implements CoreDto<DeleteDoctorByIdDto> {
  private constructor(public readonly data: Pick<DoctorEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: DeleteDoctorByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<DoctorEntity, 'id'>): DeleteDoctorByIdDto {
    return new DeleteDoctorByIdDto(object);
  }
}
