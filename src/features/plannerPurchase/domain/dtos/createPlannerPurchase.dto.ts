import { type PlannerPurchaseEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createPlannerPurchaseSchema } from '../schemas';

interface IOptionalPlannerPurchase extends Partial<Omit<PlannerPurchaseEntity, 'id'>> {}

export class CreatePlannerPurchaseDto implements CoreDto<CreatePlannerPurchaseDto> {
  private constructor(public readonly data: IOptionalPlannerPurchase) {
    this.validate(this);
  }

  public validate(dto: CreatePlannerPurchaseDto): void {
    const validationResult = createPlannerPurchaseSchema.safeParse(dto.data);

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

  public getValidatedData(): Omit<PlannerPurchaseEntity, 'id'> {
    return createPlannerPurchaseSchema.parse(this.data) as Omit<PlannerPurchaseEntity, 'id'>;
  }

  public static create(object: IOptionalPlannerPurchase): CreatePlannerPurchaseDto {
    return new CreatePlannerPurchaseDto(object);
  }
}
