import { type CreateMeasureUnitDto, type GetMeasureUnitByIdDto, type UpdateMeasureUnitDto } from '../dtos';
import { type MeasureUnitSummaryEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export abstract class MeasureUnitRepository {
  abstract create(createDto: CreateMeasureUnitDto): Promise<MeasureUnitSummaryEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<MeasureUnitSummaryEntity[]>>;
  abstract getById(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity>;
  abstract update(updateDto: UpdateMeasureUnitDto): Promise<MeasureUnitSummaryEntity>;
  abstract delete(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity>;
}
