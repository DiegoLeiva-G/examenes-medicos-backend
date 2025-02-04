import { type GetMeasureUnitByIdDto } from '../dtos';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type MeasureUnitRepository } from '../repositories';

export interface DeleteMeasureUnitUseCase {
  execute: (getByIdDto: GetMeasureUnitByIdDto) => Promise<MeasureUnitSummaryEntity>;
}

export class DeleteMeasureUnit implements DeleteMeasureUnitUseCase {
  constructor(private readonly repository: MeasureUnitRepository) {}

  async execute(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
