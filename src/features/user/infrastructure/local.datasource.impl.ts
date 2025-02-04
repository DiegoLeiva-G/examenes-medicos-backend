import {
  type CreateLocalRootUserDto,
  type CreateUserWithEmployeeIdDto,
  type GetUserByIdDto,
  type UpdateLocalRootUserDto,
  type UpdateLocalUserDto,
  type UpdateUserWithCUDto,
  UserAuthEntity,
  type UserDatasource,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import prisma from '../../../core/dbClient';
import { AppError, basicEncrypt } from '../../../core';
import { type Prisma, UserType } from '@prisma/client';
import { cleanRut } from '../../../core/helpers';

export class UserDatasourceImpl implements UserDatasource {
  private async getUsers(pagination: PaginationDto, root = false): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          tag: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      root,
      archived: false,
    };

    const [totalUsers, users] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      results: users.map(user => UserAuthEntity.fromJson(user)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalUsers,
      totalPages,
    };
  }

  public async getAllUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    return await this.getUsers(pagination);
  }

  public async getAllRootUsers(pagination: PaginationDto): Promise<PaginationResponseEntity<UserAuthEntity[]>> {
    return await this.getUsers(pagination, true);
  }

  public async getById(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    const { id } = getByIdDto.data;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user?.id) {
      throw AppError.notFound(`Usuario con id ${id} no existe`);
    }

    return UserAuthEntity.fromJson(user);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private async getEmployeeWithUser(employeeId: string) {
    const employee = await prisma.employee.findUnique({
      select: {
        id: true,
        person: {
          select: {
            rut: true,
            name: true,
            lastName: true,
          },
        },
        user: {
          select: {
            id: true,
            archived: true,
          },
        },
      },
      where: {
        id: employeeId,
      },
    });

    if (!employee?.id) {
      throw AppError.notFound(`Funcionario con id ${employeeId} no existe`);
    }

    if (employee?.user?.archived === false) {
      throw AppError.badRequest('Este funcionario ya tiene usuario, intente con otro', [
        { constraint: 'User already exists', field: 'employeeId' },
      ]);
    }

    return employee;
  }

  public async createCUUser(createUserWithEmployeeIdDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    const { employeeId, enabled } = createUserWithEmployeeIdDto.getValidatedData();

    const employee = await this.getEmployeeWithUser(employeeId);

    if (employee?.user?.archived === true) {
      const restoredUser = await prisma.user.update({
        data: {
          type: UserType.ClaveUnica,
          archived: false,
          enabled,
        },
        where: {
          id: employee.user.id,
        },
      });

      return UserAuthEntity.fromJson(restoredUser);
    }

    const createdUser = await prisma.user.create({
      data: {
        type: UserType.ClaveUnica,
        username: cleanRut(employee.person?.rut ?? ''),
        tag: `${employee.person?.name} ${employee.person?.lastName}`,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });

    return UserAuthEntity.fromJson(createdUser);
  }

  public async createLocalUser(createUserWithEmployeeIdDto: CreateUserWithEmployeeIdDto): Promise<UserAuthEntity> {
    const { employeeId, enabled } = createUserWithEmployeeIdDto.getValidatedData();

    const employee = await this.getEmployeeWithUser(employeeId);

    const hashedPassword = basicEncrypt.hashPassword(cleanRut(employee?.person?.rut ?? '').slice(0, 6));

    if (employee?.user?.archived === true) {
      const restoredUser = await prisma.user.update({
        data: {
          type: UserType.Local,
          password: hashedPassword,
          archived: false,
          enabled,
        },
        where: {
          id: employee.user.id,
        },
      });

      return UserAuthEntity.fromJson(restoredUser);
    }

    const createdUser = await prisma.user.create({
      data: {
        type: UserType.Local,
        username: cleanRut(employee.person?.rut ?? ''),
        password: hashedPassword,
        tag: `${employee.person?.name} ${employee.person?.lastName}`,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });

    return UserAuthEntity.fromJson(createdUser);
  }

  public async createLocalRoot(createLocalRootUserDto: CreateLocalRootUserDto): Promise<UserAuthEntity> {
    const { username, password, tag } = createLocalRootUserDto.getValidatedData();

    const alreadyUser = await prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        username,
      },
    });

    if (alreadyUser?.id) {
      throw AppError.badRequest('Ya existe un usuario con este nombre, intente con otro', [
        { constraint: 'User already exists', field: 'username' },
      ]);
    }

    const createdUser = await prisma.user.create({
      data: {
        type: UserType.Local,
        username,
        password: basicEncrypt.hashPassword(password ?? ''),
        tag,
        root: true,
      },
    });

    return UserAuthEntity.fromJson(createdUser);
  }

  public async updateWithCU(updateUserWithCUDto: UpdateUserWithCUDto): Promise<UserAuthEntity> {
    const { id } = await this.getById(updateUserWithCUDto);
    const { enabled } = updateUserWithCUDto.getValidatedData();

    const updatedUser = await prisma.user.update({
      data: {
        enabled,
      },
      where: {
        id,
      },
    });

    return UserAuthEntity.fromJson(updatedUser);
  }

  public async updateLocalUser(updateLocalUserDto: UpdateLocalUserDto): Promise<UserAuthEntity> {
    const { id } = await this.getById(updateLocalUserDto);
    const { password: receivedPassword, newPassword, enabled } = updateLocalUserDto.getValidatedData();

    if (!receivedPassword || !newPassword) {
      const updatedUser = await prisma.user.update({
        data: {
          enabled,
        },
        where: {
          id,
        },
      });

      return UserAuthEntity.fromJson(updatedUser);
    }

    const currentUser = await prisma.user.findUnique({
      select: {
        password: true,
      },
      where: {
        id,
      },
    });

    const isPasswordMatch = basicEncrypt.comparePassword(receivedPassword, currentUser?.password ?? '');

    if (!isPasswordMatch) {
      throw AppError.badRequest('La contraseña no es válida');
    }

    const updatedUser = await prisma.user.update({
      data: {
        password: basicEncrypt.hashPassword(newPassword),
        enabled,
      },
      where: {
        id,
      },
    });

    return UserAuthEntity.fromJson(updatedUser);
  }

  public async updateLocalRootUser(updateLocalRootUserDto: UpdateLocalRootUserDto): Promise<UserAuthEntity> {
    const { id } = await this.getById(updateLocalRootUserDto);
    const {
      password: receivedPassword,
      newPassword,
      tag,
      username,
      enabled,
    } = updateLocalRootUserDto.getValidatedData();

    const alreadyUsername = await prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        username,
        id: {
          not: id,
        },
      },
    });

    if (alreadyUsername?.id) {
      throw AppError.badRequest('Ya existe un usuario con este nombre, intente con otro');
    }

    if (!receivedPassword || !newPassword) {
      const updatedUser = await prisma.user.update({
        data: {
          tag,
          username,
          enabled,
        },
        where: {
          id,
        },
      });

      return UserAuthEntity.fromJson(updatedUser);
    }

    const currentUser = await prisma.user.findUnique({
      select: {
        password: true,
      },
      where: {
        id,
      },
    });

    const isPasswordMatch = basicEncrypt.comparePassword(receivedPassword, currentUser?.password ?? '');

    if (!isPasswordMatch) {
      throw AppError.badRequest('La contraseña no es válida');
    }

    const updatedUser = await prisma.user.update({
      data: {
        tag,
        username,
        password: basicEncrypt.hashPassword(newPassword),
        enabled,
      },
      where: {
        id,
      },
    });

    return UserAuthEntity.fromJson(updatedUser);
  }

  public async delete(getByIdDto: GetUserByIdDto): Promise<UserAuthEntity> {
    const { id, root } = await this.getById(getByIdDto);

    if (root) {
      throw AppError.badRequest('No se puede eliminar este tipo de usuario');
    }

    const deletedUser = await prisma.user.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return UserAuthEntity.fromJson(deletedUser);
  }
}
