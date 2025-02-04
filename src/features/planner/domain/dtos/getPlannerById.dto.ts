import { type PlannerEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerByIdDto implements CoreDto<GetPlannerByIdDto> {
  private constructor(public readonly data: Pick<PlannerEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la planificación',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerEntity, 'id'>): GetPlannerByIdDto {
    return new GetPlannerByIdDto(object);
  }
}
