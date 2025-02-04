import type { UserEntity } from '../../../user';
import { type DepartmentEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editDepartmentSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IDepartment extends Partial<Omit<DepartmentEntity, 'id'>> {
  id: UserEntity['id'];
}

export class UpdateDepartmentDto implements CoreDto<UpdateDepartmentDto> {
  private constructor(public readonly data: IDepartment) {
    this.validate(this);
  }

  public validate(dto: UpdateDepartmentDto): void {
    const validationResult = editDepartmentSchema.safeParse(dto.data);

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

  public getValidatedData(): IDepartment {
    return editDepartmentSchema.parse(this.data) as IDepartment;
  }

  public static create(object: IDepartment): UpdateDepartmentDto {
    return new UpdateDepartmentDto(object);
  }
}
