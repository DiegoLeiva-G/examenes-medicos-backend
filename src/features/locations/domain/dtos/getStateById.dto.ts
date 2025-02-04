import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';
import { type StateEntity } from '../entities';

export class GetStateByIdDto implements CoreDto<GetStateByIdDto> {
  private constructor(public readonly data: Pick<StateEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetStateByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la región',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<StateEntity, 'id'>): GetStateByIdDto {
    return new GetStateByIdDto(object);
  }
}
