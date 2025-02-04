import { type FundingSourceEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { AppError } from '../../../../core';
import { createFundingSourceSchema } from '../schemas';

interface IOptionalFundingSource extends Partial<Omit<FundingSourceEntity, 'id'>> {}

export class CreateFundingSourceDto implements CoreDto<CreateFundingSourceDto> {
  private constructor(public readonly data: IOptionalFundingSource) {
    this.validate(this);
  }

  public validate(dto: CreateFundingSourceDto): void {
    const validationResult = createFundingSourceSchema.safeParse(dto.data);

    if (!validationResult.success) {
      throw AppError.badRequest(
        'Error en la validación de la fuente de financiamiento',
        (validationResult.error?.issues || []).map(issue => ({
          field: (issue.path[0] || '').toString(),
          constraint: issue.message,
        })),
      );
    }
  }

  public getValidatedData(): Omit<FundingSourceEntity, 'id'> {
    return createFundingSourceSchema.parse(this.data) as Omit<FundingSourceEntity, 'id'>;
  }

  public static create(object: IOptionalFundingSource): CreateFundingSourceDto {
    return new CreateFundingSourceDto(object);
  }
}
