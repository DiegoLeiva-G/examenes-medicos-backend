import { type PlannerPurchaseTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerPurchaseTaskSchema } from '../schemas';

interface IOptionalPlannerPurchaseTask
  extends Partial<Omit<PlannerPurchaseTaskEntity, 'id' | 'approvedBudget' | 'status'>> {}

export class CreatePlannerPurchaseTaskDto implements CoreDto<CreatePlannerPurchaseTaskDto> {
  private constructor(public readonly data: IOptionalPlannerPurchaseTask) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerPurchaseTaskDto): void {
    const validationResult = createPlannerPurchaseTaskSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de compras',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<PlannerPurchaseTaskEntity, 'id' | 'approvedBudget' | 'status'> {
    return createPlannerPurchaseTaskSchema.parse(this.data) as Omit<
      PlannerPurchaseTaskEntity,
      'id' | 'approvedBudget' | 'status'
    >;
  }

  public static create(object: IOptionalPlannerPurchaseTask): CreatePlannerPurchaseTaskDto {
    return new CreatePlannerPurchaseTaskDto(object);
  }
}
