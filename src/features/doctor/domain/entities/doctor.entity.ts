import { type Doctor } from '@prisma/client';
import { AppError } from '../../../../core';

export class DoctorEntity implements Doctor {
  constructor(
    public id: Doctor['id'],
    public rut: Doctor['rut'],
    public name: Doctor['name'],
    public middleName: Doctor['middleName'],
    public lastName: Doctor['lastName'],
    public secondaryLastName: Doctor['secondaryLastName'],
    public address: Doctor['address'],
    public email: Doctor['email'],
    public phone: Doctor['phone'],
    public birthdate: Doctor['birthdate'],
    public medicalExamination: unknown,
    public medicalProfession: unknown,
    public deleted: Doctor['deleted'],
    public createdAt: Doctor['createdAt'],
    public updatedAt: Doctor['updatedAt'],
  ) {}

  public static fromJson(obj: DoctorEntity): DoctorEntity {
    const {
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      deleted,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new DoctorEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class DoctorGetAllResponseEntity implements Omit<DoctorEntity, 'id' | 'deleted' | 'updatedAt'> {
  constructor(
    public rut: DoctorEntity['rut'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public address: DoctorEntity['address'],
    public email: DoctorEntity['email'],
    public phone: DoctorEntity['phone'],
    public birthdate: DoctorEntity['birthdate'],
    public medicalExamination: DoctorEntity['medicalExamination'],
    public medicalProfession: DoctorEntity['medicalProfession'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorGetAllResponseEntity): DoctorGetAllResponseEntity {
    const {
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      createdAt,
    } = obj;

    return new DoctorGetAllResponseEntity(
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      createdAt,
    );
  }
}

export class DoctorGetByIdResponseEntity implements Pick<DoctorEntity, 'id'> {
  constructor(
    public id: DoctorEntity['id'],
    public rut: DoctorEntity['rut'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public address: DoctorEntity['address'],
    public email: DoctorEntity['email'],
    public phone: DoctorEntity['phone'],
    public birthdate: DoctorEntity['birthdate'],
    public medicalExamination: DoctorEntity['medicalExamination'],
    public medicalProfession: DoctorEntity['medicalProfession'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorGetByIdResponseEntity): DoctorGetByIdResponseEntity {
    const {
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      createdAt,
    } = obj;

    return new DoctorGetByIdResponseEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      medicalExamination,
      medicalProfession,
      createdAt,
    );
  }
}

export class DoctorCreateResponseEntity
  implements Omit<DoctorEntity, 'medicalExamination' | 'medicalProfession' | 'deleted' | 'updatedAt'>
{
  constructor(
    public id: DoctorEntity['id'],
    public rut: DoctorEntity['rut'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public address: DoctorEntity['address'],
    public email: DoctorEntity['email'],
    public phone: DoctorEntity['phone'],
    public birthdate: DoctorEntity['birthdate'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorCreateResponseEntity): DoctorCreateResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName, address, email, phone, birthdate, createdAt } = obj;

    return new DoctorCreateResponseEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      createdAt,
    );
  }
}

export class DoctorUpdateResponseEntity
  implements
    Pick<
      DoctorEntity,
      | 'id'
      | 'rut'
      | 'name'
      | 'middleName'
      | 'lastName'
      | 'secondaryLastName'
      | 'address'
      | 'email'
      | 'phone'
      | 'birthdate'
      | 'createdAt'
    >
{
  constructor(
    public id: DoctorEntity['id'],
    public rut: DoctorEntity['rut'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public address: DoctorEntity['address'],
    public email: DoctorEntity['email'],
    public phone: DoctorEntity['phone'],
    public birthdate: DoctorEntity['birthdate'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorUpdateResponseEntity): DoctorUpdateResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName, address, email, phone, birthdate, createdAt } = obj;

    return new DoctorUpdateResponseEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      createdAt,
    );
  }
}

export class DoctorDeleteResponseEntity implements Pick<DoctorEntity, 'id'> {
  constructor(public id: DoctorEntity['id']) {}

  public static fromJson(obj: DoctorDeleteResponseEntity): DoctorDeleteResponseEntity {
    const { id } = obj;

    return new DoctorDeleteResponseEntity(id);
  }
}
