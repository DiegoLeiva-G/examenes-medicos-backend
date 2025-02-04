import { type CreateUserWithEmployeeIdDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface CreateLocalUserUseCase {
  execute: (data: CreateUserWithEmployeeIdDto) => Promise<UserAuthEntity>;
}

export class CreateLocalUser implements CreateLocalUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    return await this.repository.createLocalUser(data);
  }
}
