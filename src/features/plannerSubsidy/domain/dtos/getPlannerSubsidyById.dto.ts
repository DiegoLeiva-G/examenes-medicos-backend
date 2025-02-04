import { type PlannerSubsidyEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerSubsidyByIdDto implements CoreDto<GetPlannerSubsidyByIdDto> {
  private constructor(public readonly data: Pick<PlannerSubsidyEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerSubsidyByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la planificación de transferencias y subvenciones',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerSubsidyEntity, 'id'>): GetPlannerSubsidyByIdDto {
    return new GetPlannerSubsidyByIdDto(object);
  }
}
