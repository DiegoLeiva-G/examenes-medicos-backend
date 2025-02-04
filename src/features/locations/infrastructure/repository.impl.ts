import {
  type GetStateByIdDto,
  type LocationDatasource,
  type LocationRepository,
  type StateEntity,
  type StateToSelectEntity,
  type SubStateToSelectEntity,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class LocationRepositoryImpl implements LocationRepository {
  constructor(private readonly datasource: LocationDatasource) {}

  async getStatesToSelect(pagination: PaginationDto): Promise<PaginationResponseEntity<StateToSelectEntity[]>> {
    return await this.datasource.getStatesToSelect(pagination);
  }

  async getStateById(getByIdDto: GetStateByIdDto): Promise<StateEntity> {
    return await this.datasource.getStateById(getByIdDto);
  }

  async getSubStatesByStateIdToSelect(
    pagination: PaginationDto,
    stateId: StateEntity['id'],
  ): Promise<PaginationResponseEntity<SubStateToSelectEntity[]>> {
    return await this.datasource.getSubStatesByStateIdToSelect(pagination, stateId);
  }
}
