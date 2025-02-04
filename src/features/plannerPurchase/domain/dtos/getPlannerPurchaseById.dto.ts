import { type PlannerPurchaseEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerPurchaseByIdDto implements CoreDto<GetPlannerPurchaseByIdDto> {
  private constructor(public readonly data: Pick<PlannerPurchaseEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerPurchaseByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la planificación de compra',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerPurchaseEntity, 'id'>): GetPlannerPurchaseByIdDto {
    return new GetPlannerPurchaseByIdDto(object);
  }
}
