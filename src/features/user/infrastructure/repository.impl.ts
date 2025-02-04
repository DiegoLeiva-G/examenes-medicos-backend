import {
  type CreateLocalRootUserDto,
  type CreateUserWithEmployeeIdDto,
  type GetUserByIdDto,
  type UpdateLocalRootUserDto,
  type UpdateLocalUserDto,
  type UpdateUserWithCUDto,
  type UserAuthEntity,
  type UserDatasource,
  type UserRepository,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async createCUUser(createUserWithEmployeeIdDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    return await this.datasource.createCUUser(createUserWithEmployeeIdDto);
  }

  async createLocalUser(createUserWithEmployeeIdDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    return await this.datasource.createLocalUser(createUserWithEmployeeIdDto);
  }

  async createLocalRoot(createLocalRootUserDto: CreateLocalRootUserDto): Promise<UserAuthEntity> {
    return await this.datasource.createLocalRoot(createLocalRootUserDto);
  }

  async getAllUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    return await this.datasource.getAllUsers(pagination);
  }

  async getAllRootUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    return await this.datasource.getAllRootUsers(pagination);
  }

  async getById(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async updateWithCU(updateUserWithCUDto: UpdateUserWithCUDto): Promise<UserAuthEntity> {
    return await this.datasource.updateWithCU(updateUserWithCUDto);
  }

  async updateLocalUser(updateLocalUserDto: UpdateLocalUserDto): Promise<UserAuthEntity> {
    return await this.datasource.updateLocalUser(updateLocalUserDto);
  }

  async updateLocalRootUser(updateLocalRootUserDto: UpdateLocalRootUserDto): Promise<UserAuthEntity> {
    return await this.datasource.updateLocalRootUser(updateLocalRootUserDto);
  }

  async delete(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
