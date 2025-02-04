import { type UpdateUserWithCUDto } from '../dtos';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface UpdateUserWithCUUseCase {
  execute: (data: UpdateUserWithCUDto) => Promise<UserAuthEntity>;
}

export class UpdateUserWithCU implements UpdateUserWithCUUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: UpdateUserWithCUDto): Promise<UserAuthEntity> {
    return await this.repository.updateWithCU(data);
  }
}
