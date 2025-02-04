import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type DirectorateEntity } from '../entities';
import { type GetDirectorateByCodeDto } from '../dtos';

export abstract class DirectorateRepository {
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>>;
  abstract getAllWithDepartments(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>>;
  abstract getByCode(getByCode: GetDirectorateByCodeDto): Promise<DirectorateEntity>;
}
