import {
  type CreateImprovementProjectDto,
  type GetImprovementProjectByIdDto,
  type ImprovementProjectDatasource,
  type ImprovementProjectEntity,
  type ImprovementProjectEntityToList,
  type ImprovementProjectRepository,
  type ImprovementProjectSummaryEntity,
  type UpdateImprovementProjectDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class ImprovementProjectRepositoryImpl implements ImprovementProjectRepository {
  constructor(private readonly datasource: ImprovementProjectDatasource) {}

  async create(createDto: CreateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ImprovementProjectEntityToList[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectSummaryEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
