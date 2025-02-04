import { type CreatePersonDto } from '../dtos';
import { type PersonEntity } from '../entities';
import { type PersonRepository } from '../repositories';

export interface CreatePersonUseCase {
  execute: (data: CreatePersonDto) => Promise<PersonEntity>;
}

export class CreatePerson implements CreatePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(data: CreatePersonDto): Promise<PersonEntity> {
    return await this.repository.create(data);
  }
}
