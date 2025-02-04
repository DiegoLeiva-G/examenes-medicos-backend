import type { UserEntity } from '../../../user';
import { type FundingSourceEntity } from '../entities';
import { type CoreDto } from '../../../_global';
import { editFundingSourceSchema } from '../schemas';
import { AppError } from '../../../../core';

interface IFundingSource extends Partial<Omit<FundingSourceEntity, 'id'>> {
  id: UserEntity['id'];
}

export class UpdateFundingSourceDto implements CoreDto<UpdateFundingSourceDto> {
  private constructor(public readonly data: IFundingSource) {
    this.validate(this);
  }

  public validate(dto: UpdateFundingSourceDto): void {
    const validationResult = editFundingSourceSchema.safeParse(dto.data);

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

  public getValidatedData(): IFundingSource {
    return editFundingSourceSchema.parse(this.data) as IFundingSource;
  }

  public static create(object: IFundingSource): UpdateFundingSourceDto {
    return new UpdateFundingSourceDto(object);
  }
}
