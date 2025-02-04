import { type CreateImprovementProjectDto } from '../dtos';
import { type ImprovementProjectEntity } from '../entities';
import { type ImprovementProjectRepository } from '../repositories';

export interface CreateImprovementProjectUseCase {
  execute: (data: CreateImprovementProjectDto) => Promise<ImprovementProjectEntity>;
}

export class CreateImprovementProject implements CreateImprovementProjectUseCase {
  constructor(private readonly repository: ImprovementProjectRepository) {}

  async execute(data: CreateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    return await this.repository.create(data);
  }
}
