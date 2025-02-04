import { type CoreDto, idSchema } from '../../../_global';
import { type UserEntity } from '../entities';
import { AppError } from '../../../../core';

export class GetUserByIdDto implements CoreDto<GetUserByIdDto> {
  private constructor(public readonly data: Pick<UserEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetUserByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del id de usuario',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<UserEntity, 'id'>): GetUserByIdDto {
    return new GetUserByIdDto(object);
  }
}
