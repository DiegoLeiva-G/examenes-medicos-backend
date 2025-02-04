import { type PlannerSubsidyTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editPlannerSubsidyTaskSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IPlannerSubsidyTask
  extends Partial<Omit<PlannerSubsidyTaskEntity, 'id' | 'plannerSubsidyId' | 'approvedBudget' | 'status'>> {
  id: PlannerSubsidyTaskEntity['id'];
}

export class UpdatePlannerSubsidyTaskDto implements CoreDto<UpdatePlannerSubsidyTaskDto> {
  private constructor(public readonly data: IPlannerSubsidyTask) {
    this.validate(this);
  }

  public validate(dto: UpdatePlannerSubsidyTaskDto): void {
    const validationResult = editPlannerSubsidyTaskSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de transferencias y subvenciones',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IPlannerSubsidyTask {
    return editPlannerSubsidyTaskSchema.parse(this.data) as IPlannerSubsidyTask;
  }

  public static create(object: IPlannerSubsidyTask): UpdatePlannerSubsidyTaskDto {
    return new UpdatePlannerSubsidyTaskDto(object);
  }
}
