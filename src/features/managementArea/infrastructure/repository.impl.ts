import {
  type GetManagementAreaByCodeDto,
  type ManagementAreaDatasource,
  type ManagementAreaEntity,
  type ManagementAreaRepository,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class ManagementAreaRepositoryImpl implements ManagementAreaRepository {
  constructor(private readonly datasource: ManagementAreaDatasource) {}

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ManagementAreaEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getByCode(getByCode: GetManagementAreaByCodeDto): Promise<ManagementAreaEntity> {
    return await this.datasource.getByCode(getByCode);
  }
}
