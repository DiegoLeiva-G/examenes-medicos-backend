import {
  type CreateImprovementProjectDto,
  type GetImprovementProjectByIdDto,
  type UpdateImprovementProjectDto,
} from '../dtos';
import {
  type ImprovementProjectEntity,
  type ImprovementProjectEntityToList,
  type ImprovementProjectSummaryEntity,
} from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export abstract class ImprovementProjectDatasource {
  abstract create(createDto: CreateImprovementProjectDto): Promise<ImprovementProjectEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ImprovementProjectEntityToList[]>>;
  abstract getById(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectSummaryEntity>;
  abstract update(updateDto: UpdateImprovementProjectDto): Promise<ImprovementProjectEntity>;
  abstract delete(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectEntity>;
}
