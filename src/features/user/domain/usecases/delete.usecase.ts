import { type GetUserByIdDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface DeleteUserUseCase {
  execute: (getByIdDto: GetUserByIdDto) => Promise<UserAuthEntity>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    return await this.repository.delete(getByIdDto);
  }
}
