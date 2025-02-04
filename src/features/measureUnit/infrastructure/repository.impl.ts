import {
  type CreateMeasureUnitDto,
  type GetMeasureUnitByIdDto,
  type MeasureUnitDatasource,
  type MeasureUnitSummaryEntity,
  type MeasureUnitRepository,
  type UpdateMeasureUnitDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class MeasureUnitRepositoryImpl implements MeasureUnitRepository {
  constructor(private readonly datasource: MeasureUnitDatasource) {}

  async create(createDto: CreateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<MeasureUnitSummaryEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateMeasureUnitDto): Promise<MeasureUnitSummaryEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetMeasureUnitByIdDto): Promise<MeasureUnitSummaryEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
