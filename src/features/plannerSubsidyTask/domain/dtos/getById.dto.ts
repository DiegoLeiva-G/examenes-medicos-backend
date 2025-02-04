import { type PlannerSubsidyTaskEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerSubsidyTaskByIdDto implements CoreDto<GetPlannerSubsidyTaskByIdDto> {
  private constructor(public readonly data: Pick<PlannerSubsidyTaskEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerSubsidyTaskByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de transferencias y subvenciones',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerSubsidyTaskEntity, 'id'>): GetPlannerSubsidyTaskByIdDto {
    return new GetPlannerSubsidyTaskByIdDto(object);
  }
}
