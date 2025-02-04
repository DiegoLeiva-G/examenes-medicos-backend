import { type UpdateMeasureUnitDto } from '../dtos';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type MeasureUnitRepository } from '../repositories';

export interface UpdateMeasureUnitUseCase {
  execute: (data: UpdateMeasureUnitDto) => Promise<MeasureUnitSummaryEntity>;
}

export class UpdateMeasureUnit implements UpdateMeasureUnitUseCase {
  constructor(private readonly repository: MeasureUnitRepository) {}

  async execute(data: UpdateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    return await this.repository.update(data);
  }
}
