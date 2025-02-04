import {
  type CreatePersonDto,
  type GetPersonByDniDto,
  type GetPersonByIdDto,
  type PersonDatasource,
  type PersonEntity,
  type PersonRepository,
  type UpdatePersonDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class PersonRepositoryImpl implements PersonRepository {
  constructor(private readonly datasource: PersonDatasource) {}

  async create(createDto: CreatePersonDto): Promise<PersonEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<PersonEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetPersonByIdDto): Promise<PersonEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async getByDni(getPersonByDniDto: GetPersonByDniDto): Promise<PersonEntity | null> {
    return await this.datasource.getByDni(getPersonByDniDto);
  }

  async update(updateDto: UpdatePersonDto): Promise<PersonEntity> {
    return await this.datasource.update(updateDto);
  }
}
