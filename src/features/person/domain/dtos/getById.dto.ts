import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';
import { type PersonEntity } from '../entities';

export class GetPersonByIdDto implements CoreDto<GetPersonByIdDto> {
  private constructor(public readonly data: Pick<PersonEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPersonByIdDto): void {
    const validationResult = idSchema.safeParse(dto);

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

  public static create(object: Pick<PersonEntity, 'id'>): GetPersonByIdDto {
    return new GetPersonByIdDto(object);
  }
}
