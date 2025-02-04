import { type UserEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editLocalRootUserSchema } from '../schemas';
import { AppError } from '../../../../core';

interface ILocalRootUser extends Partial<Omit<UserEntity, 'id'>> {
  id: UserEntity['id'];
  newPassword?: string;
  repeatPassword?: string;
}

export class UpdateLocalRootUserDto implements CoreDto<UpdateLocalRootUserDto> {
  private constructor(public readonly data: ILocalRootUser) {
    this.validate(this);
  }

  public validate(dto: UpdateLocalRootUserDto): void {
    const validationResult = editLocalRootUserSchema.safeParse(dto.data);

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

  public getValidatedData(): ILocalRootUser {
    return editLocalRootUserSchema.parse(this.data) as ILocalRootUser;
  }

  public static create(object: ILocalRootUser): UpdateLocalRootUserDto {
    return new UpdateLocalRootUserDto(object);
  }
}
