import { type PersonEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editPersonSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IPerson extends Partial<Omit<PersonEntity, 'id'>> {
  id: PersonEntity['id'];
}

export class UpdatePersonDto implements CoreDto<UpdatePersonDto> {
  private constructor(public readonly data: IPerson) {
    this.validate(this);
  }

  public validate(dto: UpdatePersonDto): void {
    const validationResult = editPersonSchema.safeParse(dto.data);

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

  public getValidatedData(): IPerson {
    return editPersonSchema.parse(this.data) as IPerson;
  }

  public static create(object: IPerson): UpdatePersonDto {
    return new UpdatePersonDto(object);
  }
}
