import { type IncomeBudgetDetailEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editIncomeBudgetDetailSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IIncomeBudgetDetail extends Partial<Omit<IncomeBudgetDetailEntity, 'id' | 'accountCode' | 'incomeBudgetId'>> {
  id: IncomeBudgetDetailEntity['id'];
}

export class UpdateIncomeBudgetDetailDto implements CoreDto<UpdateIncomeBudgetDetailDto> {
  private constructor(public readonly data: IIncomeBudgetDetail) {
    this.validate(this);
  }

  public validate(dto: UpdateIncomeBudgetDetailDto): void {
    const validationResult = editIncomeBudgetDetailSchema.safeParse(dto.data);

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

  public getValidatedData(): IIncomeBudgetDetail {
    return editIncomeBudgetDetailSchema.parse(this.data) as IIncomeBudgetDetail;
  }

  public static create(object: IIncomeBudgetDetail): UpdateIncomeBudgetDetailDto {
    return new UpdateIncomeBudgetDetailDto(object);
  }
}
