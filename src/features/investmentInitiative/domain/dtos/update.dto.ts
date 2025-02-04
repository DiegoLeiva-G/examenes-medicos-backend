import type { UserEntity } from '../../../user';
import { type InvestmentInitiativeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editInvestmentInitiativeSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IInvestmentInitiative extends Partial<Omit<InvestmentInitiativeEntity, 'id'>> {
  id: UserEntity['id'];
  fundingSourceIds?: string[];
  specificPladecoIds?: string[];
}

export class UpdateInvestmentInitiativeDto implements CoreDto<UpdateInvestmentInitiativeDto> {
  private constructor(public readonly data: IInvestmentInitiative) {
    this.validate(this);
  }

  public validate(dto: UpdateInvestmentInitiativeDto): void {
    const validationResult = editInvestmentInitiativeSchema.safeParse(dto.data);

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

  public getValidatedData(): IInvestmentInitiative {
    return editInvestmentInitiativeSchema.parse(this.data) as IInvestmentInitiative;
  }

  public static create(object: IInvestmentInitiative): UpdateInvestmentInitiativeDto {
    return new UpdateInvestmentInitiativeDto(object);
  }
}
