import { type GetUserByIdDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface GetUserByIdUseCase {
  execute: (getByIdDto: GetUserByIdDto) => Promise<UserAuthEntity>;
}

export class GetUserById implements GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
