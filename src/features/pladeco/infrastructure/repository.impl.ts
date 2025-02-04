import {
  type PladecoDatasource,
  type PladecoRepository,
  type SpecificPladecoToListEntity,
  type StrategicPladecoToListEntity,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class PladecoRepositoryImpl implements PladecoRepository {
  constructor(private readonly datasource: PladecoDatasource) {}

  async getStrategics(pagination: PaginationDto): Promise<PaginationResponseEntity<StrategicPladecoToListEntity[]>> {
    return await this.datasource.getStrategics(pagination);
  }

  async getSpecifics(pagination: PaginationDto): Promise<PaginationResponseEntity<SpecificPladecoToListEntity[]>> {
    return await this.datasource.getSpecifics(pagination);
  }
}
