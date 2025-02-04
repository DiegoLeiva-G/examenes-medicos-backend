import type { UserEntity } from '../../../user';
import { type EmployeeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editEmployeeSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IEmployee extends Partial<Omit<EmployeeEntity, 'id' | 'personId'>> {
  id: UserEntity['id'];
}

export class UpdateEmployeeDto implements CoreDto<UpdateEmployeeDto> {
  private constructor(public readonly data: IEmployee) {
    this.validate(this);
  }

  public validate(dto: UpdateEmployeeDto): void {
    const validationResult = editEmployeeSchema.safeParse(dto.data);

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

  public getValidatedData(): IEmployee {
    return editEmployeeSchema.parse(this.data) as IEmployee;
  }

  public static create(object: IEmployee): UpdateEmployeeDto {
    return new UpdateEmployeeDto(object);
  }
}
