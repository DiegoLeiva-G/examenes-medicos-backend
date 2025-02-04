import { type IncomeBudgetEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetIncomeBudgetByIdDto implements CoreDto<GetIncomeBudgetByIdDto> {
  private constructor(public readonly data: Pick<IncomeBudgetEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetIncomeBudgetByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<IncomeBudgetEntity, 'id'>): GetIncomeBudgetByIdDto {
    return new GetIncomeBudgetByIdDto(object);
  }
}
