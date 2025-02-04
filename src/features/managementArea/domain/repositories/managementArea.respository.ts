import { type ManagementAreaEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type GetManagementAreaByCodeDto } from '../dtos';

export abstract class ManagementAreaRepository {
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ManagementAreaEntity[]>>;
  abstract getByCode(getByCode: GetManagementAreaByCodeDto): Promise<ManagementAreaEntity>;
}
