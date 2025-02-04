import { type NextFunction, type Request, type Response } from 'express';
import {
  CreateCUUser,
  CreateLocalRootUser,
  CreateLocalRootUserDto,
  CreateLocalUser,
  CreateUserWithEmployeeIdDto,
  DeleteUser,
  GetUserById,
  GetUserByIdDto,
  GetUsers,
  UpdateLocalRootUser,
  UpdateLocalRootUserDto,
  UpdateLocalUser,
  UpdateLocalUserDto,
  UpdateUserWithCU,
  UpdateUserWithCUDto,
  type UserAuthEntity,
  type UserEntity,
  type UserRepository,
} from '../domain';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseStringBoolean } from '../../../core/helpers';
import { GetRootUsers } from '../domain/usecases/getAllRoot.usecase';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<UserEntity, 'id'>>> {
  newPassword: string;
  repeatPassword: string;
  employeeId: string;
}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class UserController {
  //* Dependency injection
  constructor(private readonly repository: UserRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<UserAuthEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetUsers(this.repository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getAllRoot = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<UserAuthEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetRootUsers(this.repository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (req: Request<Params>, res: Response<SuccessResponse<UserAuthEntity>>, next: NextFunction): void => {
    const { id } = req.params;
    const getUserByIdDto = GetUserByIdDto.create({ id });

    new GetUserById(this.repository)
      .execute(getUserByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createCUUser = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { employeeId, enabled } = req.body;
    const createDto = CreateUserWithEmployeeIdDto.create({ employeeId, enabled: parseStringBoolean(enabled) });

    new CreateCUUser(this.repository)
      .execute(createDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public createLocalUser = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { employeeId, enabled } = req.body;
    const createDto = CreateUserWithEmployeeIdDto.create({ employeeId, enabled: parseStringBoolean(enabled) });

    new CreateLocalUser(this.repository)
      .execute(createDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public createLocalRootUser = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { username, password, repeatPassword, tag } = req.body;
    const createDto = CreateLocalRootUserDto.create({ username, password, repeatPassword, tag });

    new CreateLocalRootUser(this.repository)
      .execute(createDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateUserWithCU = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { enabled } = req.body;
    const updateDto = UpdateUserWithCUDto.create({
      id,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateUserWithCU(this.repository)
      .execute(updateDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public updateLocalUser = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { password, newPassword, repeatPassword, enabled } = req.body;
    const updateDto = UpdateLocalUserDto.create({
      id,
      password,
      newPassword,
      repeatPassword,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateLocalUser(this.repository)
      .execute(updateDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public updateLocalRootUser = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<UserAuthEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { username, password, newPassword, repeatPassword, tag, enabled } = req.body;
    const updateDto = UpdateLocalRootUserDto.create({
      id,
      username,
      password,
      newPassword,
      repeatPassword,
      tag,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateLocalRootUser(this.repository)
      .execute(updateDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (req: Request<Params>, res: Response<SuccessResponse<UserAuthEntity>>, next: NextFunction): void => {
    const { id } = req.params;
    const getUserByIdDto = GetUserByIdDto.create({ id });

    new DeleteUser(this.repository)
      .execute(getUserByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
