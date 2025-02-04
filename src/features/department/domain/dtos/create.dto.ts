import { type DepartmentEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createDepartmentSchema } from '../schemas';

interface IOptionalDepartment extends Partial<Omit<DepartmentEntity, 'id'>> {}

export class CreateDepartmentDto implements CoreDto<CreateDepartmentDto> {
  private constructor(public readonly data: IOptionalDepartment) {
    this.validate(this);
  }

  public validate(dto: CreateDepartmentDto): void {
    const validationResult = createDepartmentSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<DepartmentEntity, 'id'> {
    return createDepartmentSchema.parse(this.data) as Omit<DepartmentEntity, 'id'>;
  }

  public static create(object: IOptionalDepartment): CreateDepartmentDto {
    return new CreateDepartmentDto(object);
  }
}
