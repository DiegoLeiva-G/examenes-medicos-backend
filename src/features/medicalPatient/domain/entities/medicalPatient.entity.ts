import { AppError } from '../../../../core';
import { type MedicalPatient } from '@prisma/client';

export class MedicalPatientEntity implements MedicalPatient {
  constructor(
    public id: MedicalPatient['id'],
    public rut: MedicalPatient['rut'],
    public name: MedicalPatient['name'],
    public middleName: MedicalPatient['middleName'],
    public lastName: MedicalPatient['lastName'],
    public secondaryLastName: MedicalPatient['secondaryLastName'],
    public medicalExamination: unknown[],
    public deleted: MedicalPatient['deleted'],
    public createdAt: MedicalPatient['createdAt'],
    public updatedAt: MedicalPatient['updatedAt'],
  ) {}

  public static fromJson(obj: MedicalPatientEntity): MedicalPatientEntity {
    const {
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      medicalExamination,
      deleted,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MedicalPatientEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      medicalExamination,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class MedicalPatientGetAllResponseEntity implements Omit<MedicalPatientEntity, 'deleted' | 'updatedAt'> {
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientGetAllResponseEntity): MedicalPatientGetAllResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName, medicalExamination, createdAt } = obj;

    return new MedicalPatientGetAllResponseEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      medicalExamination,
      createdAt,
    );
  }
}

export class MedicalPatientGetByIdResponseEntity implements Pick<MedicalPatientEntity, 'id'> {
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientGetByIdResponseEntity): MedicalPatientGetByIdResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName, medicalExamination, createdAt } = obj;

    return new MedicalPatientGetByIdResponseEntity(
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      medicalExamination,
      createdAt,
    );
  }
}

export class MedicalPatientCreateResponseEntity
  implements Omit<MedicalPatientEntity, 'medicalExamination' | 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
  ) {}

  public static fromJson(obj: MedicalPatientCreateResponseEntity): MedicalPatientCreateResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName } = obj;

    return new MedicalPatientCreateResponseEntity(id, rut, name, middleName, lastName, secondaryLastName);
  }
}

export class MedicalPatientUpdateResponseEntity
  implements Pick<MedicalPatientEntity, 'id' | 'rut' | 'name' | 'middleName' | 'lastName' | 'secondaryLastName'>
{
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
  ) {}

  public static fromJson(obj: MedicalPatientUpdateResponseEntity): MedicalPatientUpdateResponseEntity {
    const { id, rut, name, middleName, lastName, secondaryLastName } = obj;

    return new MedicalPatientUpdateResponseEntity(id, rut, name, middleName, lastName, secondaryLastName);
  }
}

export class MedicalPatientDeleteResponseEntity implements Pick<MedicalPatientEntity, 'id'> {
  constructor(public id: MedicalPatientEntity['id']) {}

  public static fromJson(obj: MedicalPatientDeleteResponseEntity): MedicalPatientDeleteResponseEntity {
    const { id } = obj;

    return new MedicalPatientDeleteResponseEntity(id);
  }
}
