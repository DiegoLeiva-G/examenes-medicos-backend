import { type CreateUserWithEmployeeIdDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface CreateCUUserUseCase {
  execute: (data: CreateUserWithEmployeeIdDto) => Promise<UserAuthEntity>;
}

export class CreateCUUser implements CreateCUUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    return await this.repository.createCUUser(data);
  }
}
