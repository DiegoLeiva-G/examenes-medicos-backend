import type { CreatePersonDto, GetPersonByDniDto, GetPersonByIdDto, UpdatePersonDto } from '../dtos';
import type { PersonEntity } from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';

export abstract class PersonDatasource {
  abstract create(createDto: CreatePersonDto): Promise<PersonEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<PersonEntity[]>>;
  abstract getById(getByIdDto: GetPersonByIdDto): Promise<PersonEntity>;
  abstract getByDni(getByDniDto: GetPersonByDniDto): Promise<PersonEntity | null>;
  abstract update(updateDto: UpdatePersonDto): Promise<PersonEntity>;
}
