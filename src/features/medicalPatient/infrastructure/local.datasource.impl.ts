import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import { prismaSearchQuery } from '../../../core/helpers';
import {
  type CreateEmployeeDto,
  type EmployeeDatasource,
  DoctorEntity,
  EmployeeEntityToList,
  type GetEmployeeByIdDto,
  type UpdateEmployeeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class EmployeeDatasourceImpl implements EmployeeDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<EmployeeEntityToList[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.EmployeeWhereInput = {
      OR: [
        {
          person: {
            OR: [
              ...prismaSearchQuery<Prisma.PersonWhereInput>('name', search),
              ...prismaSearchQuery<Prisma.PersonWhereInput>('middleName', search),
              ...prismaSearchQuery<Prisma.PersonWhereInput>('lastName', search),
              ...prismaSearchQuery<Prisma.PersonWhereInput>('secondaryLastName', search),
              ...prismaSearchQuery<Prisma.PersonWhereInput>('rut', search),
            ],
          },
        },
      ],
      archived: false,
    };

    const [totalEmployees, employees] = await prisma.$transaction([
      prisma.employee.count({ where }),
      prisma.employee.findMany({
        select: {
          id: true,
          email: true,
          enabled: true,
          person: {
            select: {
              id: true,
              rut: true,
              name: true,
              lastName: true,
            },
          },
        },
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalEmployees / limit);

    return {
      results: employees.map(employee => EmployeeEntityToList.fromJson(employee)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalEmployees,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity> {
    const { id } = getByIdDto.data;

    const employee = await prisma.employee.findUnique({
      include: {
        person: true,
      },
      where: {
        id,
        archived: false,
      },
    });

    if (!employee?.id) {
      throw AppError.notFound(`Funcionario con id ${id} no existe`);
    }

    return DoctorEntity.fromJson(employee);
  }

  private async validateCity(cityId: string): Promise<void> {
    const city = await prisma.city.findFirst({
      select: {
        id: true,
      },
      where: {
        id: cityId,
      },
    });

    if (!city?.id) {
      throw AppError.badRequest('Error validación ciudad', [
        { constraint: 'No existe una ciudad con este id', field: 'cityId' },
      ]);
    }
  }

  public async create(createDto: CreateEmployeeDto): Promise<DoctorEntity> {
    const { cityId, personId, address, phone, email, studyLevel, studyDescription, enabled } =
      createDto.getValidatedData();

    if (cityId) {
      await this.validateCity(cityId);
    }

    const person = await prisma.person.findUnique({
      select: {
        id: true,
        employee: {
          select: {
            id: true,
            archived: true,
          },
        },
      },
      where: {
        id: personId ?? '',
      },
    });

    const employeeData: Prisma.EmployeeCreateInput = {
      ...(personId ? { person: { connect: { id: personId } } } : {}),
      ...(cityId ? { city: { connect: { id: cityId } } } : {}),
      address,
      phone,
      studyLevel,
      studyDescription,
      enabled,
    };

    if (person?.employee?.id && !person.employee.archived) {
      throw AppError.badRequest('Este funcionario ya existe');
    }

    if (person?.employee?.id && person.employee.archived) {
      const restoredEmployee = await prisma.employee.update({
        where: {
          id: person.employee.id,
        },
        data: {
          ...employeeData,
          email,
          archived: false,
        },
      });

      return DoctorEntity.fromJson(restoredEmployee);
    }

    if (!email) {
      const createdEmployee = await prisma.employee.create({
        data: {
          ...employeeData,
        },
      });

      return DoctorEntity.fromJson(createdEmployee);
    }

    const employee = await prisma.employee.findFirst({
      select: {
        id: true,
        archived: true,
      },
      where: {
        email,
      },
    });

    if (employee?.id && !employee?.archived) {
      throw AppError.badRequest('Error validación funcionario', [
        { constraint: 'Existe un funcionario con ese correo', field: 'email' },
      ]);
    }

    if (employee?.id && employee?.archived) {
      const restoredEmployee = await prisma.employee.update({
        where: {
          id: employee.id,
        },
        data: {
          ...employeeData,
          email,
        },
      });

      return DoctorEntity.fromJson(restoredEmployee);
    }

    const createdEmployee = await prisma.employee.create({
      data: {
        ...employeeData,
        email,
      },
    });

    return DoctorEntity.fromJson(createdEmployee);
  }

  public async update(updateDto: UpdateEmployeeDto): Promise<DoctorEntity> {
    const { id } = await this.getById(updateDto);
    const { cityId, address, phone, email, studyLevel, studyDescription, enabled } = updateDto.getValidatedData();

    if (cityId) {
      await this.validateCity(cityId);
    }

    if (email) {
      const employee = await prisma.employee.findFirst({
        where: {
          id: {
            not: id,
          },
          email,
          archived: false,
        },
      });

      if (employee?.id) {
        throw AppError.badRequest('Error validación funcionario', [
          { constraint: 'Existe un funcionario con ese correo', field: 'email' },
        ]);
      }
    }

    const updatedEmployee = await prisma.employee.update({
      data: {
        cityId,
        address,
        email,
        phone,
        studyLevel,
        studyDescription,
        enabled,
      },
      where: {
        id,
      },
    });

    return DoctorEntity.fromJson(updatedEmployee);
  }

  public async delete(getByIdDto: GetEmployeeByIdDto): Promise<DoctorEntity> {
    const { id } = await this.getById(getByIdDto);

    const deletedEmployee = await prisma.employee.update({
      data: {
        archived: true,
      },
      where: {
        id,
      },
    });

    return DoctorEntity.fromJson(deletedEmployee);
  }
}
