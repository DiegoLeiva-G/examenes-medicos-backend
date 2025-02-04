import { type PersonEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPersonSchema } from '../schemas';

interface IOptionalPerson extends Partial<Omit<PersonEntity, 'id' | 'nationalityId'>> {}

export class CreatePersonDto implements CoreDto<CreatePersonDto> {
  private constructor(public readonly data: IOptionalPerson) {
    this.validate(this);
  }

  public validate(dto: CreatePersonDto): void {
    const validationResult = createPersonSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PersonEntity, 'id'> {
    return createPersonSchema.parse(this.data) as Omit<PersonEntity, 'id'>;
  }

  public static create(object: IOptionalPerson): CreatePersonDto {
    return new CreatePersonDto(object);
  }
}
