import { type IncomeBudgetDetailEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetIncomeBudgetDetailByIdDto implements CoreDto<GetIncomeBudgetDetailByIdDto> {
  private constructor(public readonly data: Pick<IncomeBudgetDetailEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetIncomeBudgetDetailByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<IncomeBudgetDetailEntity, 'id'>): GetIncomeBudgetDetailByIdDto {
    return new GetIncomeBudgetDetailByIdDto(object);
  }
}
