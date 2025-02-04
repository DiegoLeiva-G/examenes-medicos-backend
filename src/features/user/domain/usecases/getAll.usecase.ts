import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type UserAuthEntity } from '../entities';
import { type UserRepository } from '../repositories';

export interface GetUsersUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<UserAuthEntity[]>>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    return await this.repository.getAllUsers(pagination);
  }
}
