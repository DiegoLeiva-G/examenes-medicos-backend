import { type MeasureUnitEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createMeasureUnitSchema } from '../schemas';

interface IOptionalMeasureUnit extends Partial<Omit<MeasureUnitEntity, 'id'>> {}

export class CreateMeasureUnitDto implements CoreDto<CreateMeasureUnitDto> {
  private constructor(public readonly data: IOptionalMeasureUnit) {
    this.validate(this);
  }

  public validate(dto: CreateMeasureUnitDto): void {
    const validationResult = createMeasureUnitSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la unidad de medida',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<MeasureUnitEntity, 'id'> {
    return createMeasureUnitSchema.parse(this.data) as Omit<MeasureUnitEntity, 'id'>;
  }

  public static create(object: IOptionalMeasureUnit): CreateMeasureUnitDto {
    return new CreateMeasureUnitDto(object);
  }
}
