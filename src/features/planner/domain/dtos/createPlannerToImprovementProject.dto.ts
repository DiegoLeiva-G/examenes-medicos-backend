import { type PlannerEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerToImprovementProjectSchema } from '../schemas';

interface IOptionalPlanner extends Partial<Omit<PlannerEntity, 'id'>> {}

export class CreatePlannerToImprovementProjectDto implements CoreDto<CreatePlannerToImprovementProjectDto> {
  private constructor(public readonly data: IOptionalPlanner) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerToImprovementProjectDto): void {
    const validationResult = createPlannerToImprovementProjectSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerEntity, 'id'> {
    return createPlannerToImprovementProjectSchema.parse(this.data) as Omit<PlannerEntity, 'id'>;
  }

  public static create(object: IOptionalPlanner): CreatePlannerToImprovementProjectDto {
    return new CreatePlannerToImprovementProjectDto(object);
  }
}
