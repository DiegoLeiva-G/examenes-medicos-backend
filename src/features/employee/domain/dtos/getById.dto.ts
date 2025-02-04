import { type EmployeeEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetEmployeeByIdDto implements CoreDto<GetEmployeeByIdDto> {
  private constructor(public readonly data: Pick<EmployeeEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetEmployeeByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del funcionario',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<EmployeeEntity, 'id'>): GetEmployeeByIdDto {
    return new GetEmployeeByIdDto(object);
  }
}
