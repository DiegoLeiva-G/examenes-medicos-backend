import { type IncomeBudgetDetailEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createIncomeBudgetDetailSchema } from '../schemas';

interface IOptionalIncomeBudgetDetail extends Partial<Omit<IncomeBudgetDetailEntity, 'id'>> {}

export class CreateIncomeBudgetDetailDto implements CoreDto<CreateIncomeBudgetDetailDto> {
  private constructor(public readonly data: IOptionalIncomeBudgetDetail) {
    this.validate(this);
  }

  public validate(dto: CreateIncomeBudgetDetailDto): void {
    const validationResult = createIncomeBudgetDetailSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación del detalle del presupuesto de ingreso',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<IncomeBudgetDetailEntity, 'id'> {
    return createIncomeBudgetDetailSchema.parse(this.data) as Omit<IncomeBudgetDetailEntity, 'id'>;
  }

  public static create(object: IOptionalIncomeBudgetDetail): CreateIncomeBudgetDetailDto {
    return new CreateIncomeBudgetDetailDto(object);
  }
}
