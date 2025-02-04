import { type ImprovementProjectEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetImprovementProjectByIdDto implements CoreDto<GetImprovementProjectByIdDto> {
  private constructor(public readonly data: Pick<ImprovementProjectEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetImprovementProjectByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del proyecto de mejoramiento',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<ImprovementProjectEntity, 'id'>): GetImprovementProjectByIdDto {
    return new GetImprovementProjectByIdDto(object);
  }
}
