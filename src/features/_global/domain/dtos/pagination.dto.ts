import { type CoreDto } from './core.dto';
import { AppError, type ValidationType } from '../../../../core';

export class PaginationDto implements CoreDto<PaginationDto> {
  public constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly limit: number,
  ) {
    this.validate(this);
  }

  public validate(dto: PaginationDto): void {
    const errors: ValidationType[] = [];

    if (isNaN(dto.page)) {
      errors.push({ field: 'page', constraint: 'Page and limit must be numbers' });
    }

    if (isNaN(dto.limit)) {
      errors.push({ field: 'limit', constraint: 'Page and limit must be numbers' });
    }

    if (dto.page <= 0) {
      errors.push({ field: 'page', constraint: 'Page must be greater than zero' });
    }

    if (dto.limit <= 0) {
      errors.push({ field: 'limit', constraint: 'Limit must be greater than zero' });
    }

    if (errors.length > 0) throw AppError.badRequest('Error validating pagination', errors);
  }

  public static create(object: Record<string, unknown>): PaginationDto {
    const { search, page, limit } = object;
    return new PaginationDto(search as string, page as number, limit as number);
  }
}
