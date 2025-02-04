import { type PlannerCouncilorSalaryEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerCouncilorSalarySchema } from '../schemas';

interface IOptionalPlannerCouncilorSalary extends Partial<Omit<PlannerCouncilorSalaryEntity, 'id'>> {}

export class CreatePlannerCouncilorSalaryDto implements CoreDto<CreatePlannerCouncilorSalaryDto> {
  private constructor(public readonly data: IOptionalPlannerCouncilorSalary) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerCouncilorSalaryDto): void {
    const validationResult = createPlannerCouncilorSalarySchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerCouncilorSalaryEntity, 'id'> {
    return createPlannerCouncilorSalarySchema.parse(this.data) as Omit<PlannerCouncilorSalaryEntity, 'id'>;
  }

  public static create(object: IOptionalPlannerCouncilorSalary): CreatePlannerCouncilorSalaryDto {
    return new CreatePlannerCouncilorSalaryDto(object);
  }
}
