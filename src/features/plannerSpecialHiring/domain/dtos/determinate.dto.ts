import { type PlannerSpecialHiringEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { determinatePlannerSpecialHiringSchema } from '../schemas';

interface IPlannerSpecialHiring extends Pick<PlannerSpecialHiringEntity, 'id' | 'status' | 'observation'> {}
interface IOptionalPlannerSpecialHiring extends Partial<IPlannerSpecialHiring> {}

export class DeterminatePlannerSpecialHiringDto implements CoreDto<DeterminatePlannerSpecialHiringDto> {
  private constructor(public readonly data: IOptionalPlannerSpecialHiring) {
    this.validate(this);
  }

  public validate(dto: DeterminatePlannerSpecialHiringDto): void {
    const validationResult = determinatePlannerSpecialHiringSchema.safeParse(dto.data);

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

  public getValidatedData(): IPlannerSpecialHiring {
    return determinatePlannerSpecialHiringSchema.parse(this.data) as IPlannerSpecialHiring;
  }

  public static create(object: IOptionalPlannerSpecialHiring): DeterminatePlannerSpecialHiringDto {
    return new DeterminatePlannerSpecialHiringDto(object);
  }
}
