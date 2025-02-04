import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type PersonEntity } from '../entities';
import { type PersonRepository } from '../repositories';

export interface GetPersonsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<PersonEntity[]>>;
}

export class GetPersons implements GetPersonsUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<PersonEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
