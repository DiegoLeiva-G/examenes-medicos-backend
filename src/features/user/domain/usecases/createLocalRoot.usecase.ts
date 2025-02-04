import { type CreateLocalRootUserDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface CreateLocalRootUserUseCase {
  execute: (data: CreateLocalRootUserDto) => Promise<UserAuthEntity>;
}

export class CreateLocalRootUser implements CreateLocalRootUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: CreateLocalRootUserDto): Promise<UserAuthEntity> {
    return await this.repository.createLocalRoot(data);
  }
}
