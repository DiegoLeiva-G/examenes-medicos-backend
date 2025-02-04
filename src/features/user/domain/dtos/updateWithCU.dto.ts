import { type UserEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editUserWithCU } from '../schemas';
import { AppError } from '../../../../core';

interface IUserWithCU extends Partial<Pick<UserEntity, 'enabled'>> {
  id: UserEntity['id'];
}

export class UpdateUserWithCUDto implements CoreDto<UpdateUserWithCUDto> {
  private constructor(public readonly data: IUserWithCU) {
    this.validate(this);
  }

  public validate(dto: UpdateUserWithCUDto): void {
    const validationResult = editUserWithCU.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error al validar la actualización del usuario',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || 0).toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IUserWithCU {
    return editUserWithCU.parse(this.data) as IUserWithCU;
  }

  public static create(object: IUserWithCU): UpdateUserWithCUDto {
    return new UpdateUserWithCUDto(object);
  }
}
