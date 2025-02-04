import { type UserEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editLocalUserSchema } from '../schemas';
import { AppError } from '../../../../core';

interface ILocalUser extends Partial<Pick<UserEntity, 'password' | 'enabled'>> {
  id: UserEntity['id'];
  newPassword?: string;
  repeatPassword?: string;
}

export class UpdateLocalUserDto implements CoreDto<UpdateLocalUserDto> {
  private constructor(public readonly data: ILocalUser) {
    this.validate(this);
  }

  public validate(dto: UpdateLocalUserDto): void {
    const validationResult = editLocalUserSchema.safeParse(dto.data);

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

  public getValidatedData(): ILocalUser {
    return editLocalUserSchema.parse(this.data) as ILocalUser;
  }

  public static create(object: ILocalUser): UpdateLocalUserDto {
    return new UpdateLocalUserDto(object);
  }
}
