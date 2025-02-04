import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createUserWithEmployeeIdSchema } from '../schemas';

interface IUserWithEmployeeId {
  employeeId: string;
  enabled?: boolean;
}

export class CreateUserWithEmployeeIdDto implements CoreDto<CreateUserWithEmployeeIdDto> {
  private constructor(public readonly data: IUserWithEmployeeId) {
    this.validate(this);
  }

  public validate(dto: CreateUserWithEmployeeIdDto): void {
    const validationResult = createUserWithEmployeeIdSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error al validar la creación de usuario',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || 0).toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IUserWithEmployeeId {
    return createUserWithEmployeeIdSchema.parse(this.data) as IUserWithEmployeeId;
  }

  public static create(object: IUserWithEmployeeId): CreateUserWithEmployeeIdDto {
    return new CreateUserWithEmployeeIdDto(object);
  }
}
