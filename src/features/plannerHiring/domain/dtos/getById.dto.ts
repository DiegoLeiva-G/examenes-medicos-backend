import { type PlannerHiringEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerHiringByIdDto implements CoreDto<GetPlannerHiringByIdDto> {
  private constructor(public readonly data: Pick<PlannerHiringEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerHiringByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la planificación de contratación de honorarios',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerHiringEntity, 'id'>): GetPlannerHiringByIdDto {
    return new GetPlannerHiringByIdDto(object);
  }
}
