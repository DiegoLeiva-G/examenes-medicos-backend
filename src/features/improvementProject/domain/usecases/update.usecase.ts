import { type UpdateImprovementProjectDto } from '../dtos';
import { type ImprovementProjectEntity } from '../entities';
import { type ImprovementProjectRepository } from '../repositories';

export interface UpdateImprovementProjectUseCase {
  execute: (data: UpdateImprovementProjectDto) => Promise<ImprovementProjectEntity>;
}

export class UpdateImprovementProject implements UpdateImprovementProjectUseCase {
  constructor(private readonly repository: ImprovementProjectRepository) {}

  async execute(data: UpdateImprovementProjectDto): Promise<ImprovementProjectEntity> {
    return await this.repository.update(data);
  }
}
