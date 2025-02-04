import { type PlannerSubsidyTaskEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerSubsidyTaskSchema } from '../schemas';

interface IOptionalPlannerSubsidyTask
  extends Partial<Omit<PlannerSubsidyTaskEntity, 'id' | 'approvedBudget' | 'status'>> {}

export class CreatePlannerSubsidyTaskDto implements CoreDto<CreatePlannerSubsidyTaskDto> {
  private constructor(public readonly data: IOptionalPlannerSubsidyTask) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerSubsidyTaskDto): void {
    const validationResult = createPlannerSubsidyTaskSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerSubsidyTaskEntity, 'id' | 'approvedBudget' | 'status'> {
    return createPlannerSubsidyTaskSchema.parse(this.data) as Omit<
      PlannerSubsidyTaskEntity,
      'id' | 'approvedBudget' | 'status'
    >;
  }

  public static create(object: IOptionalPlannerSubsidyTask): CreatePlannerSubsidyTaskDto {
    return new CreatePlannerSubsidyTaskDto(object);
  }
}
