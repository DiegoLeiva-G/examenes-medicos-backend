import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { type PersonEntity } from '../entities';
import { chileanDniSchema } from '../schemas';

export class GetPersonByDniDto implements CoreDto<GetPersonByDniDto> {
  private constructor(public readonly data: Pick<PersonEntity, 'rut'>) {
    this.validate(this);
  }

  public validate(dto: GetPersonByDniDto): void {
    const validationResult = chileanDniSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la persona',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PersonEntity, 'rut'>): GetPersonByDniDto {
    return new GetPersonByDniDto(object);
  }
}
