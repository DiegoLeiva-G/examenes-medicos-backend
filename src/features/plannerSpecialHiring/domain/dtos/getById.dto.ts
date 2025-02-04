import { type PlannerSpecialHiringEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerSpecialHiringByIdDto implements CoreDto<GetPlannerSpecialHiringByIdDto> {
  private constructor(public readonly data: Pick<PlannerSpecialHiringEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerSpecialHiringByIdDto): void {
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

  public static create(object: Pick<PlannerSpecialHiringEntity, 'id'>): GetPlannerSpecialHiringByIdDto {
    return new GetPlannerSpecialHiringByIdDto(object);
  }
}
