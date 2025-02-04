import { type PlannerSpecialHiringEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { requestPlannerSpecialHiringSchema } from '../schemas';

interface IOptionalPlannerSpecialHiring extends Partial<Omit<PlannerSpecialHiringEntity, 'id'>> {}

export class RequestPlannerSpecialHiringDto implements CoreDto<RequestPlannerSpecialHiringDto> {
  private constructor(public readonly data: IOptionalPlannerSpecialHiring) {
    this.validate(this);
  }

  public validate(dto: RequestPlannerSpecialHiringDto): void {
    const validationResult = requestPlannerSpecialHiringSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerSpecialHiringEntity, 'id'> {
    return requestPlannerSpecialHiringSchema.parse(this.data) as Omit<PlannerSpecialHiringEntity, 'id'>;
  }

  public static create(object: IOptionalPlannerSpecialHiring): RequestPlannerSpecialHiringDto {
    return new RequestPlannerSpecialHiringDto(object);
  }
}
