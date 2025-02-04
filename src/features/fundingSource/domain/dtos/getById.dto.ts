import { type FundingSourceEntity } from '../entities';
import { type CoreDto, idSchema } from '../../../_global';
import { AppError } from '../../../../core';

export class GetFundingSourceByIdDto implements CoreDto<GetFundingSourceByIdDto> {
  private constructor(public readonly data: Pick<FundingSourceEntity, 'id'>) {
    this.validate(this);
  }

  public validate(dto: GetFundingSourceByIdDto): void {
    const validationResult = idSchema.safeParse(dto.data);

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

  public static create(object: Pick<FundingSourceEntity, 'id'>): GetFundingSourceByIdDto {
    return new GetFundingSourceByIdDto(object);
  }
}
