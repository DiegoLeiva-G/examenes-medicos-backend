import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type SpecificPladecoToListEntity } from '../entities';
import { type PladecoRepository } from '../repositories';

export interface GetSpecificsPladecoUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<SpecificPladecoToListEntity[]>>;
}

export class GetSpecificsPladeco implements GetSpecificsPladecoUseCase {
  constructor(private readonly repository: PladecoRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<SpecificPladecoToListEntity[]>> {
    return await this.repository.getSpecifics(pagination);
  }
}
