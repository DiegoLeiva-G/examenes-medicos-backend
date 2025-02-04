import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type StateEntity, type SubStateToSelectEntity } from '../entities';
import { type LocationRepository } from '../repositories';

export interface GetSubStatesByStateIdToSelectUseCase {
  execute: (
    pagination: PaginationDto,
    stateId: StateEntity['id'],
  ) => Promise<PaginationResponseEntity<SubStateToSelectEntity[]>>;
}

export class GetSubStatesByStateIdToSelect implements GetSubStatesByStateIdToSelectUseCase {
  constructor(private readonly repository: LocationRepository) {}

  async execute(
    pagination: PaginationDto,
    stateId: StateEntity['id'],
  ): Promise<PaginationResponseEntity<SubStateToSelectEntity[]>> {
    return await this.repository.getSubStatesByStateIdToSelect(pagination, stateId);
  }
}
