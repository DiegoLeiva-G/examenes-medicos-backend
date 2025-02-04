import { type DepartmentEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetDepartmentByIdDto implements CoreDto<GetDepartmentByIdDto> {
  private constructor(public readonly data: Pick<DepartmentEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetDepartmentByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del departamento',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<DepartmentEntity, 'id'>): GetDepartmentByIdDto {
    return new GetDepartmentByIdDto(object);
  }
}
