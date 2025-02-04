import { type PersonEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type CreatePersonDto, type GetPersonByDniDto, type GetPersonByIdDto, type UpdatePersonDto } from '../dtos';

export abstract class PersonRepository {
  abstract create(createDto: CreatePersonDto): Promise<PersonEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<PersonEntity[]>>;
  abstract getById(getByIdDto: GetPersonByIdDto): Promise<PersonEntity>;
  abstract getByDni(getByDniDto: GetPersonByDniDto): Promise<PersonEntity | null>;
  abstract update(updateDto: UpdatePersonDto): Promise<PersonEntity>;
}
