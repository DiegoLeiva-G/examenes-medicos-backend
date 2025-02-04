import { type GetDirectorateByCodeDto } from '../dtos';
import { type DirectorateEntity } from '../entities';
import { type DirectorateRepository } from '../repositories';

export interface GetDirectorateByCodeUseCase {
  execute: (getByCodeDto: GetDirectorateByCodeDto) => Promise<DirectorateEntity>;
}

export class GetDirectorateByCode implements GetDirectorateByCodeUseCase {
  constructor(private readonly repository: DirectorateRepository) {}

  async execute(getByCodeDto: GetDirectorateByCodeDto): Promise<DirectorateEntity> {
    return await this.repository.getByCode(getByCodeDto);
  }
}
