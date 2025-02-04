import { type PlannerPurchaseTaskEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerPurchaseTaskByIdDto implements CoreDto<GetPlannerPurchaseTaskByIdDto> {
  private constructor(public readonly data: Pick<PlannerPurchaseTaskEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerPurchaseTaskByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de compra',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<PlannerPurchaseTaskEntity, 'id'>): GetPlannerPurchaseTaskByIdDto {
    return new GetPlannerPurchaseTaskByIdDto(object);
  }
}
