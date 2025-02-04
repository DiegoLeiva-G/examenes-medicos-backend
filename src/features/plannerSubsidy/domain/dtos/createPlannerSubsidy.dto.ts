import { type PlannerSubsidyEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerSubsidySchema } from '../schemas';

interface IOptionalPlannerSubsidy extends Partial<Omit<PlannerSubsidyEntity, 'id'>> {}

export class CreatePlannerSubsidyDto implements CoreDto<CreatePlannerSubsidyDto> {
  private constructor(public readonly data: IOptionalPlannerSubsidy) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerSubsidyDto): void {
    const validationResult = createPlannerSubsidySchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerSubsidyEntity, 'id'> {
    return createPlannerSubsidySchema.parse(this.data) as Omit<PlannerSubsidyEntity, 'id'>;
  }

  public static create(object: IOptionalPlannerSubsidy): CreatePlannerSubsidyDto {
    return new CreatePlannerSubsidyDto(object);
  }
}
