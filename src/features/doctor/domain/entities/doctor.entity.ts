import { AppError } from '../../../../core';
import { type Doctor } from '@prisma/client';

export class DoctorEntity implements Doctor {
  constructor(
    public id: Doctor['id'],
    public name: Doctor['name'],
    public middleName: Doctor['middleName'],
    public lastName: Doctor['lastName'],
    public secondaryLastName: Doctor['secondaryLastName'],
    public nameProfession: Doctor['nameProfession'],
    public specialization: Doctor['specialization'],
    public medicalExamination: unknown[],
    public deleted: Doctor['deleted'],
    public createdAt: Doctor['createdAt'],
    public updatedAt: Doctor['updatedAt'],
  ) {}

  public static fromJson(obj: DoctorEntity): DoctorEntity {
    const {
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      deleted,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new DoctorEntity(
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class DoctorGetAllResponseEntity implements Omit<DoctorEntity, 'deleted' | 'updatedAt'> {
  constructor(
    public id: DoctorEntity['id'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public nameProfession: Doctor['nameProfession'],
    public specialization: Doctor['specialization'],
    public medicalExamination: DoctorEntity['medicalExamination'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorGetAllResponseEntity): DoctorGetAllResponseEntity {
    const {
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      createdAt,
    } = obj;

    return new DoctorGetAllResponseEntity(
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      createdAt,
    );
  }
}

export class DoctorGetByIdResponseEntity implements Pick<DoctorEntity, 'id'> {
  constructor(
    public id: DoctorEntity['id'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public nameProfession: Doctor['nameProfession'],
    public specialization: Doctor['specialization'],
    public medicalExamination: DoctorEntity['medicalExamination'],
    public createdAt: DoctorEntity['createdAt'],
  ) {}

  public static fromJson(obj: DoctorGetByIdResponseEntity): DoctorGetByIdResponseEntity {
    const {
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      createdAt,
    } = obj;

    return new DoctorGetByIdResponseEntity(
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
      medicalExamination,
      createdAt,
    );
  }
}

export class DoctorCreateResponseEntity
  implements Omit<DoctorEntity, 'medicalExamination' | 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: DoctorEntity['id'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public nameProfession: Doctor['nameProfession'],
    public specialization: Doctor['specialization'],
  ) {}

  public static fromJson(obj: DoctorCreateResponseEntity): DoctorCreateResponseEntity {
    const { id, name, middleName, lastName, secondaryLastName, nameProfession, specialization } = obj;

    return new DoctorCreateResponseEntity(
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
    );
  }
}

export class DoctorUpdateResponseEntity
  implements
    Pick<
      DoctorEntity,
      'id' | 'name' | 'middleName' | 'lastName' | 'secondaryLastName' | 'nameProfession' | 'specialization'
    >
{
  constructor(
    public id: DoctorEntity['id'],
    public name: DoctorEntity['name'],
    public middleName: DoctorEntity['middleName'],
    public lastName: DoctorEntity['lastName'],
    public secondaryLastName: DoctorEntity['secondaryLastName'],
    public nameProfession: DoctorEntity['nameProfession'],
    public specialization: DoctorEntity['specialization'],
  ) {}

  public static fromJson(obj: DoctorUpdateResponseEntity): DoctorUpdateResponseEntity {
    const { id, name, middleName, lastName, secondaryLastName, nameProfession, specialization } = obj;

    return new DoctorUpdateResponseEntity(
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession,
      specialization,
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
