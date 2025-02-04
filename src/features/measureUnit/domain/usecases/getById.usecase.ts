import { type GetMeasureUnitByIdDto } from '../dtos';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type MeasureUnitRepository } from '../repositories';

export interface GetMeasureUnitByIdUseCase {
  execute: (getByIdDto: GetMeasureUnitByIdDto) => Promise<MeasureUnitSummaryEntity>;
}

export class GetMeasureUnitById implements GetMeasureUnitByIdUseCase {
  constructor(private readonly repository: MeasureUnitRepository) {}

  async execute(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
