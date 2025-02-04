import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type StateToSelectEntity } from '../entities';
import { type LocationRepository } from '../repositories';

export interface GetStatesToSelectUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<StateToSelectEntity[]>>;
}

export class GetStatesToSelect implements GetStatesToSelectUseCase {
  constructor(private readonly repository: LocationRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<StateToSelectEntity[]>> {
    return await this.repository.getStatesToSelect(pagination);
  }
}
