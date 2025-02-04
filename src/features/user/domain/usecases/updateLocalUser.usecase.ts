import { type UpdateLocalUserDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface UpdateLocalUserUseCase {
  execute: (data: UpdateLocalUserDto) => Promise<UserAuthEntity>;
}

export class UpdateLocalUser implements UpdateLocalUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: UpdateLocalUserDto): Promise<UserAuthEntity> {
    return await this.repository.updateLocalUser(data);
  }
}
