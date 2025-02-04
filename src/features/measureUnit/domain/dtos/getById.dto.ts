import { type MeasureUnitEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetMeasureUnitByIdDto implements CoreDto<GetMeasureUnitByIdDto> {
  private constructor(public readonly data: Pick<MeasureUnitEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetMeasureUnitByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<MeasureUnitEntity, 'id'>): GetMeasureUnitByIdDto {
    return new GetMeasureUnitByIdDto(object);
  }
}
