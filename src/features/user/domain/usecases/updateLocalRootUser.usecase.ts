import { type UpdateLocalRootUserDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface UpdateLocalRootUserUseCase {
  execute: (data: UpdateLocalRootUserDto) => Promise<UserAuthEntity>;
}

export class UpdateLocalRootUser implements UpdateLocalRootUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: UpdateLocalRootUserDto): Promise<UserAuthEntity> {
    return await this.repository.updateLocalRootUser(data);
  }
}
