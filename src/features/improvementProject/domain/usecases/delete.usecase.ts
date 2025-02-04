import { type GetImprovementProjectByIdDto } from '../dtos';
import { type ImprovementProjectEntity } from '../entities';
import { type ImprovementProjectRepository } from '../repositories';

export interface DeleteImprovementProjectUseCase {
  execute: (getByIdDto: GetImprovementProjectByIdDto) => Promise<ImprovementProjectEntity>;
}

export class DeleteImprovementProject implements DeleteImprovementProjectUseCase {
  constructor(private readonly repository: ImprovementProjectRepository) {}

  async execute(getByIdDto: GetImprovementProjectByIdDto): Promise<ImprovementProjectEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
