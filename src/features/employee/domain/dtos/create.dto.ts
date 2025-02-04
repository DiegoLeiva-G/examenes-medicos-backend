import { type EmployeeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { createEmployeeSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IOptionalEmployee extends Partial<Omit<EmployeeEntity, 'id'>> {}

export class CreateEmployeeDto implements CoreDto<CreateEmployeeDto> {
  private constructor(public readonly data: IOptionalEmployee) {
    this.validate(this);
  }

  public validate(dto: CreateEmployeeDto): void {
    const validationResult = createEmployeeSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<EmployeeEntity, 'id'> {
    return createEmployeeSchema.parse(this.data) as Omit<EmployeeEntity, 'id'>;
  }

  public static create(object: IOptionalEmployee): CreateEmployeeDto {
    return new CreateEmployeeDto(object);
  }
}
