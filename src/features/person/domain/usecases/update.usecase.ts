import { type UpdatePersonDto } from '../dtos';
import { type PersonEntity } from '../entities';
import { type PersonRepository } from '../repositories';

export interface UpdatePersonUseCase {
  execute: (data: UpdatePersonDto) => Promise<PersonEntity>;
}

export class UpdatePerson implements UpdatePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(data: UpdatePersonDto): Promise<PersonEntity> {
    return await this.repository.update(data);
  }
}
