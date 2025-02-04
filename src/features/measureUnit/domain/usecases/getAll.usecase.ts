import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type MeasureUnitRepository } from '../repositories';

export interface GetMeasureUnitsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<MeasureUnitSummaryEntity[]>>;
}

export class GetMeasureUnits implements GetMeasureUnitsUseCase {
  constructor(private readonly repository: MeasureUnitRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<MeasureUnitSummaryEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
