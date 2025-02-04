import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type GetStateByIdDto } from '../dtos';
import { type StateEntity, type StateToSelectEntity, type SubStateToSelectEntity } from '../entities';

export abstract class LocationRepository {
  abstract getStatesToSelect(pagination: PaginationDto): Promise<PaginationResponseEntity<StateToSelectEntity[]>>;
  abstract getStateById(getByIdDto: GetStateByIdDto): Promise<StateEntity>;
  abstract getSubStatesByStateIdToSelect(
    pagination: PaginationDto,
    stateId: StateEntity['id'],
  ): Promise<PaginationResponseEntity<SubStateToSelectEntity[]>>;
}
