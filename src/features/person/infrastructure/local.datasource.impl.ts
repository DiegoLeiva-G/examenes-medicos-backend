import { type Prisma } from '@prisma/client';
import prisma from '../../../core/dbClient';
import { AppError } from '../../../core';
import {
  type CreatePersonDto,
  type GetPersonByDniDto,
  type GetPersonByIdDto,
  type PersonDatasource,
  PersonEntity,
  type UpdatePersonDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import { cleanRut, prismaSearchQuery } from '../../../core/helpers';

export class PersonDatasourceImpl implements PersonDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<PersonEntity[]>> {
    const { page, limit, search } = pagination;

    const where: Prisma.PersonWhereInput = {
      OR: [
        ...prismaSearchQuery<Prisma.PersonWhereInput>('rut', cleanRut(search)),
        ...prismaSearchQuery<Prisma.PersonWhereInput>('name', search),
        ...prismaSearchQuery<Prisma.PersonWhereInput>('middleName', search),
        ...prismaSearchQuery<Prisma.PersonWhereInput>('lastName', search),
        ...prismaSearchQuery<Prisma.PersonWhereInput>('secondaryLastName', search),
      ],
    };

    const [totalPersons, persons] = await prisma.$transaction([
      prisma.person.count({ where }),
      prisma.person.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalPersons / limit);

    return {
      results: persons.map(person => PersonEntity.fromJson(person)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalPersons,
      totalPages,
    };
  }

  public async getById(getByIdDto: GetPersonByIdDto): Promise<PersonEntity> {
    const { id } = getByIdDto.data;

    const person = await prisma.person.findUnique({
      where: {
        id,
      },
    });

    if (!person?.id) {
      throw AppError.notFound(`Funcionario con id ${id} no existe`);
    }

    return PersonEntity.fromJson(person);
  }

  public async getByDni(getPersonByDniDto: GetPersonByDniDto): Promise<PersonEntity | null> {
    const { rut } = getPersonByDniDto.data;

    const person = await prisma.person.findUnique({
      where: {
        rut: cleanRut(rut),
      },
    });

    if (!person?.id) {
      return null;
    }

    return PersonEntity.fromJson(person);
  }

  public async create(createDto: CreatePersonDto): Promise<PersonEntity> {
    const { name, lastName, middleName, secondaryLastName, rut, birthdate, gender } = createDto.getValidatedData();

    const person = await prisma.person.findFirst({
      select: {
        id: true,
        archived: true,
      },
      where: {
        rut: cleanRut(rut),
      },
    });

    if (person?.id && !person.archived) {
      throw AppError.badRequest('Person already exists', [{ constraint: 'Person already exists', field: 'rut' }]);
    }

    const upsertPerson = await prisma.person.upsert({
      where: {
        id: person?.id ?? '',
      },
      create: {
        name,
        lastName,
        middleName,
        secondaryLastName,
        rut: cleanRut(rut),
        birthdate,
        gender,
      },
      update: {
        name,
        lastName,
        middleName,
        secondaryLastName,
        rut: cleanRut(rut),
        birthdate,
        gender,
        archived: false,
      },
    });

    return PersonEntity.fromJson(upsertPerson);
  }

  public async update(updateDto: UpdatePersonDto): Promise<PersonEntity> {
    const { id } = await this.getById(updateDto);
    const { name, lastName, middleName, secondaryLastName, birthdate, gender } = updateDto.getValidatedData();

    const updatedPerson = await prisma.person.update({
      data: {
        name,
        lastName,
        middleName,
        secondaryLastName,
        gender,
        birthdate,
      },
      where: {
        id,
      },
    });

    return PersonEntity.fromJson(updatedPerson);
  }
}
