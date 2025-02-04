import { type GetImprovementProjectByIdDto } from '../dtos';
import { type ImprovementProjectSummaryEntity } from '../entities';
import { type ImprovementProjectRepository } from '../repositories';

export interface GetImprovementProjectByIdUseCase {
  execute: (getByIdDto: GetImprovementProjectByIdDto) => Promise<ImprovementProjectSummaryEntity>;
}

export class GetImprovementProjectById implements GetImprovementProjectByIdUseCase {
  constructor(private readonly repository: ImprovementProjectRepository) {}

  async execute(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectSummaryEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
