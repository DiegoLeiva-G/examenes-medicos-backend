import { type PlannerHiringEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerHiringSchema } from '../schemas';

interface IOptionalPlannerHiring extends Partial<Omit<PlannerHiringEntity, 'id'>> {}

export class CreatePlannerHiringDto implements CoreDto<CreatePlannerHiringDto> {
  private constructor(public readonly data: IOptionalPlannerHiring) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerHiringDto): void {
    const validationResult = createPlannerHiringSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerHiringEntity, 'id'> {
    return createPlannerHiringSchema.parse(this.data) as Omit<PlannerHiringEntity, 'id'>;
  }

  public static create(object: IOptionalPlannerHiring): CreatePlannerHiringDto {
    return new CreatePlannerHiringDto(object);
  }
}
