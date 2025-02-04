import { AppError } from '../../../../core';
import { type CoreDto, PaginationDto } from '../../../_global';

export class AccountPlanPaginationDto extends PaginationDto implements CoreDto<PaginationDto> {
  private constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly limit: number,
    public readonly year: number,
  ) {
    super(search, page, limit);
    this.validate(this);
    this.validateAccountPlanPagination(this);
  }

  public validateAccountPlanPagination(dto: AccountPlanPaginationDto): void {
    if (!dto.year) {
      throw AppError.badRequest('Error validating pagination', [{ field: 'year', constraint: 'Year is required' }]);
    }

    if (isNaN(dto.year)) {
      throw AppError.badRequest('Error validating pagination', [{ field: 'year', constraint: 'Year must be numbers' }]);
    }
  }

  public static create(object: Record<string, unknown>): AccountPlanPaginationDto {
    const { search, page, limit, year } = object;

    return new AccountPlanPaginationDto(search as string, page as number, limit as number, year as number);
  }
}
