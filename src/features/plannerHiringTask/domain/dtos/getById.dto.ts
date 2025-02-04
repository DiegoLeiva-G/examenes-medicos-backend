import { type PlannerHiringTaskEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerHiringTaskByIdDto implements CoreDto<GetPlannerHiringTaskByIdDto> {
  private constructor(public readonly data: Pick<PlannerHiringTaskEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerHiringTaskByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de contratación de honorarios',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerHiringTaskEntity, 'id'>): GetPlannerHiringTaskByIdDto {
    return new GetPlannerHiringTaskByIdDto(object);
  }
}
