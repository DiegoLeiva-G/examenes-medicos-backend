import { type CreateMeasureUnitDto } from '../dtos';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type MeasureUnitRepository } from '../repositories';

export interface CreateMeasureUnitUseCase {
  execute: (data: CreateMeasureUnitDto) => Promise<MeasureUnitSummaryEntity>;
}

export class CreateMeasureUnit implements CreateMeasureUnitUseCase {
  constructor(private readonly repository: MeasureUnitRepository) {}

  async execute(data: CreateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    return await this.repository.create(data);
  }
}
