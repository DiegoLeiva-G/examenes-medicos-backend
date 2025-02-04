import { type InvestmentInitiativeEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createInvestmentInitiativeSchema } from '../schemas';

interface IInvestmentInitiative extends Omit<InvestmentInitiativeEntity, 'id'> {
  fundingSourceIds: string[];
  specificPladecoIds: string[];
}

interface IOptionalInvestmentInitiative extends Partial<IInvestmentInitiative> {}

export class CreateInvestmentInitiativeDto implements CoreDto<CreateInvestmentInitiativeDto> {
  private constructor(public readonly data: IOptionalInvestmentInitiative) {
    this.validate(this);
  }

  public validate(dto: CreateInvestmentInitiativeDto): void {
    const validationResult = createInvestmentInitiativeSchema.safeParse(dto.data);

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
    return createInvestmentInitiativeSchema.parse(this.data) as IInvestmentInitiative;
  }

  public static create(object: IOptionalInvestmentInitiative): CreateInvestmentInitiativeDto {
    return new CreateInvestmentInitiativeDto(object);
  }
}
