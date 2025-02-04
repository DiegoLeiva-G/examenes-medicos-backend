import { type InvestmentInitiativeEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetInvestmentInitiativeByIdDto implements CoreDto<GetInvestmentInitiativeByIdDto> {
  private constructor(public readonly data: Pick<InvestmentInitiativeEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetInvestmentInitiativeByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la iniciativa de inversión',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public static create(object: Pick<InvestmentInitiativeEntity, 'id'>): GetInvestmentInitiativeByIdDto {
    return new GetInvestmentInitiativeByIdDto(object);
  }
}
