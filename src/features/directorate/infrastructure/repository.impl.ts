import {
  type DirectorateDatasource,
  type DirectorateEntity,
  type DirectorateRepository,
  type GetDirectorateByCodeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class DirectorateRepositoryImpl implements DirectorateRepository {
  constructor(private readonly datasource: DirectorateDatasource) {}

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getAllWithDepartments(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>> {
    return await this.datasource.getAllWithDepartments(pagination);
  }

  async getByCode(getByCode: GetDirectorateByCodeDto): Promise<DirectorateEntity> {
    return await this.datasource.getByCode(getByCode);
  }
}
