import { type PlannerEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editPlannerSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IPlanner extends Partial<Omit<PlannerEntity, 'id'>> {
  id: PlannerEntity['id'];
}

export class UpdatePlannerDto implements CoreDto<UpdatePlannerDto> {
  private constructor(public readonly data: IPlanner) {
    this.validate(this);
  }

  public validate(dto: UpdatePlannerDto): void {
    const validationResult = editPlannerSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la planificación',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): IPlanner {
    return editPlannerSchema.parse(this.data) as IPlanner;
  }

  public static create(object: IPlanner): UpdatePlannerDto {
    return new UpdatePlannerDto(object);
  }
}
