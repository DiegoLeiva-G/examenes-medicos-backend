import { type UserEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createLocalRootUserSchema } from '../schemas';

interface IOptionalLocalRootUser extends Partial<Omit<UserEntity, 'id'>> {
  repeatPassword: string;
}

export class CreateLocalRootUserDto implements CoreDto<CreateLocalRootUserDto> {
  private constructor(public readonly data: IOptionalLocalRootUser) {
    this.validate(this);
  }

  public validate(dto: CreateLocalRootUserDto): void {
    const validationResult = createLocalRootUserSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<UserEntity, 'id'> {
    return createLocalRootUserSchema.parse(this.data) as Omit<UserEntity, 'id'>;
  }

  public static create(object: IOptionalLocalRootUser): CreateLocalRootUserDto {
    return new CreateLocalRootUserDto(object);
  }
}
