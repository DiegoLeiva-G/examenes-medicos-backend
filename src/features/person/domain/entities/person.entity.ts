import { type Person } from '@prisma/client';
import { AppError } from '../../../../core';
import { type EmployeeEntity } from '../../../employee';
import { type CountryEntity } from '../../../locations';

interface IPersonExtended extends Person {
  employee?: EmployeeEntity | null;
  nationality?: CountryEntity | null;
}

export class PersonEntity implements IPersonExtended {
  constructor(
    public id: Person['id'],
    public rut: Person['rut'],
    public name: Person['name'],
    public middleName: Person['middleName'],
    public lastName: Person['lastName'],
    public secondaryLastName: Person['secondaryLastName'],
    public birthdate: Person['birthdate'],
    public gender: Person['gender'],
    public nationalityId: Person['nationalityId'],
    public archived: Person['archived'],
    public createdAt: Person['createdAt'],
    public updatedAt: Person['updatedAt'],
    public employee?: EmployeeEntity | null,
    public nationality?: CountryEntity | null,
  ) {}

  public static fromJson(obj: PersonEntity): PersonEntity {
    const {
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      birthdate,
      gender,
      nationalityId,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PersonEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      birthdate,
      gender,
      nationalityId,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class PersonEntityToList implements Pick<PersonEntity, 'id' | 'rut' | 'name' | 'lastName'> {
  constructor(
    public id: Person['id'],
    public rut: Person['rut'],
    public name: Person['name'],
    public lastName: Person['lastName'],
  ) {}

  public static fromJson(obj: PersonEntityToList): PersonEntityToList {
    const { id, rut, name, lastName } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PersonEntityToList(id, rut, name, lastName);
  }
}
