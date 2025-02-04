import { type PersonEntity } from '../entities';
import { type GetPersonByDniDto } from '../dtos';
import { type PersonRepository } from '../repositories';

export interface GetPersonByDniUseCase {
  execute: (getByDniDto: GetPersonByDniDto) => Promise<PersonEntity | null>;
}

export class GetPersonByDni implements GetPersonByDniUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(getByDniDto: GetPersonByDniDto): Promise<PersonEntity | null> {
    return await this.repository.getByDni(getByDniDto);
  }
}
