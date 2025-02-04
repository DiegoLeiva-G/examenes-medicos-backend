import { type IncomeBudgetEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createIncomeBudgetSchema } from '../schemas';

interface IOptionalIncomeBudget extends Partial<Omit<IncomeBudgetEntity, 'id' | 'managementAreaReferenceCode'>> {}

export class CreateIncomeBudgetDto implements CoreDto<CreateIncomeBudgetDto> {
  private constructor(public readonly data: IOptionalIncomeBudget) {
    this.validate(this);
  }

  public validate(dto: CreateIncomeBudgetDto): void {
    const validationResult = createIncomeBudgetSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del presupuesto de ingreso',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<IncomeBudgetEntity, 'id'> {
    return createIncomeBudgetSchema.parse(this.data) as Omit<IncomeBudgetEntity, 'id'>;
  }

  public static create(object: IOptionalIncomeBudget): CreateIncomeBudgetDto {
    return new CreateIncomeBudgetDto(object);
  }
}
