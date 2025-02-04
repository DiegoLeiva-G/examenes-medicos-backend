import { type PlannerHiringTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerHiringTaskSchema } from '../schemas';

interface IOptionalPlannerHiringTask
  extends Partial<Omit<PlannerHiringTaskEntity, 'id' | 'approvedBudget' | 'status'>> {}

export class CreatePlannerHiringTaskDto implements CoreDto<CreatePlannerHiringTaskDto> {
  private constructor(public readonly data: IOptionalPlannerHiringTask) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerHiringTaskDto): void {
    const validationResult = createPlannerHiringTaskSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerHiringTaskEntity, 'id' | 'approvedBudget' | 'status'> {
    return createPlannerHiringTaskSchema.parse(this.data) as Omit<
      PlannerHiringTaskEntity,
      'id' | 'approvedBudget' | 'status'
    >;
  }

  public static create(object: IOptionalPlannerHiringTask): CreatePlannerHiringTaskDto {
    return new CreatePlannerHiringTaskDto(object);
  }
}
