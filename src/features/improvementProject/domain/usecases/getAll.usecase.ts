import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type ImprovementProjectEntityToList } from '../entities';
import { type ImprovementProjectRepository } from '../repositories';

export interface GetImprovementProjectsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<ImprovementProjectEntityToList[]>>;
}

export class GetImprovementProjects implements GetImprovementProjectsUseCase {
  constructor(private readonly repository: ImprovementProjectRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<ImprovementProjectEntityToList[]>> {
    return await this.repository.getAll(pagination);
  }
}
