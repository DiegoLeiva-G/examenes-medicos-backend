import { type PlannerCouncilorSalaryEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetPlannerCouncilorSalaryByIdDto implements CoreDto<GetPlannerCouncilorSalaryByIdDto> {
  private constructor(public readonly data: Pick<PlannerCouncilorSalaryEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetPlannerCouncilorSalaryByIdDto): void {
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

  public static create(object: Pick<PlannerCouncilorSalaryEntity, 'id'>): GetPlannerCouncilorSalaryByIdDto {
    return new GetPlannerCouncilorSalaryByIdDto(object);
  }
}
