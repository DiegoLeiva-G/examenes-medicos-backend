import type { UserEntity } from '../../../user';
import { type MeasureUnitEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editMeasureUnitSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IMeasureUnit extends Partial<Omit<MeasureUnitEntity, 'id'>> {
  id: UserEntity['id'];
}

export class UpdateMeasureUnitDto implements CoreDto<UpdateMeasureUnitDto> {
  private constructor(public readonly data: IMeasureUnit) {
    this.validate(this);
  }

  public validate(dto: UpdateMeasureUnitDto): void {
    const validationResult = editMeasureUnitSchema.safeParse(dto.data);

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

  public getValidatedData(): IMeasureUnit {
    return editMeasureUnitSchema.parse(this.data) as IMeasureUnit;
  }

  public static create(object: IMeasureUnit): UpdateMeasureUnitDto {
    return new UpdateMeasureUnitDto(object);
  }
}
