import { type PlannerPurchaseTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editPlannerPurchaseTaskSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IPlannerPurchaseTask
  extends Partial<Omit<PlannerPurchaseTaskEntity, 'id' | 'plannerPurchaseId' | 'approvedBudget' | 'status'>> {
  id: PlannerPurchaseTaskEntity['id'];
}

export class UpdatePlannerPurchaseTaskDto implements CoreDto<UpdatePlannerPurchaseTaskDto> {
  private constructor(public readonly data: IPlannerPurchaseTask) {
    this.validate(this);
  }

  public validate(dto: UpdatePlannerPurchaseTaskDto): void {
    const validationResult = editPlannerPurchaseTaskSchema.safeParse(dto.data);

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

  public getValidatedData(): IPlannerPurchaseTask {
    return editPlannerPurchaseTaskSchema.parse(this.data) as IPlannerPurchaseTask;
  }

  public static create(object: IPlannerPurchaseTask): UpdatePlannerPurchaseTaskDto {
    return new UpdatePlannerPurchaseTaskDto(object);
  }
}
