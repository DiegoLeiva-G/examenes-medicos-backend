import { type PersonEntity } from '../entities';
import { type GetPersonByIdDto } from '../dtos';
import { type PersonRepository } from '../repositories';

export interface GetPersonByIdUseCase {
  execute: (getByIdDto: GetPersonByIdDto) => Promise<PersonEntity>;
}

export class GetPersonById implements GetPersonByIdUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(getByIdDto: GetPersonByIdDto): Promise<PersonEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
