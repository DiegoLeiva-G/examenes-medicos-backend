import { type UserAuthEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import {
  type GetUserByIdDto,
  type CreateUserWithEmployeeIdDto,
  type CreateLocalRootUserDto,
  type UpdateUserWithCUDto,
  type UpdateLocalUserDto,
  type UpdateLocalRootUserDto,
} from '../dtos';

export abstract class UserRepository {
  abstract createCUUser(createUserWithEmployeeIdCUDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity>;
  abstract createLocalUser(createUserWithEmployeeIdCUDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity>;
  abstract createLocalRoot(createLocalRootUserDto: CreateLocalRootUserDto): Promise<UserAuthEntity>;
  abstract getAllUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>>;
  abstract getAllRootUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>>;
  abstract getById(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity>;
  abstract updateWithCU(updateUserWithCUDto: UpdateUserWithCUDto): Promise<UserAuthEntity>;
  abstract updateLocalUser(updateLocalUserDto: UpdateLocalUserDto): Promise<UserAuthEntity>;
  abstract updateLocalRootUser(updateLocalRootUserDto: UpdateLocalRootUserDto): Promise<UserAuthEntity>;
  abstract delete(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity>;
}
