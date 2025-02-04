import { type PlannerHiringTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editPlannerHiringTaskSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IPlannerHiringTask
  extends Partial<Omit<PlannerHiringTaskEntity, 'id' | 'plannerHiringId' | 'approvedBudget' | 'status'>> {
  id: PlannerHiringTaskEntity['id'];
}

export class UpdatePlannerHiringTaskDto implements CoreDto<UpdatePlannerHiringTaskDto> {
  private constructor(public readonly data: IPlannerHiringTask) {
    this.validate(this);
  }

  public validate(dto: UpdatePlannerHiringTaskDto): void {
    const validationResult = editPlannerHiringTaskSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la tarea de contratación de honorarios',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IPlannerHiringTask {
    return editPlannerHiringTaskSchema.parse(this.data) as IPlannerHiringTask;
  }

  public static create(object: IPlannerHiringTask): UpdatePlannerHiringTaskDto {
    return new UpdatePlannerHiringTaskDto(object);
  }
}
