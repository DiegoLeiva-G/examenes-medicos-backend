import { type MedicalPatient } from '@prisma/client';
import { AppError } from '../../../../core';
import { DoctorEntity } from "../../../doctor/domain";

export class MedicalPatientEntity implements MedicalPatient {
  constructor(
    public id: MedicalPatient['id'],
    public rut: MedicalPatient['rut'],
    public name: MedicalPatient['name'],
    public middleName: MedicalPatient['middleName'],
    public lastName: MedicalPatient['lastName'],
    public secondaryLastName: MedicalPatient['secondaryLastName'],
    public address: MedicalPatient['address'],
    public email: MedicalPatient['email'],
    public phone: MedicalPatient['phone'],
    public birthdate: MedicalPatient['birthdate'],
    public gender: MedicalPatient['gender'],
    public medicalExamination: unknown,
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
      address,
      email,
      phone,
      birthdate,
      gender,
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
      address,
      email,
      phone,
      birthdate,
      gender,
      medicalExamination,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class MedicalPatientGetAllResponseEntity implements Omit<MedicalPatientEntity, 'id' | 'deleted' | 'updatedAt'> {
  constructor(
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
    public address: MedicalPatientEntity['address'],
    public email: MedicalPatientEntity['email'],
    public phone: MedicalPatientEntity['phone'],
    public birthdate: MedicalPatientEntity['birthdate'],
    public gender: MedicalPatientEntity['gender'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientGetAllResponseEntity): MedicalPatientGetAllResponseEntity {
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
      gender,
      medicalExamination,
      createdAt,
    } = obj;

    return new MedicalPatientGetAllResponseEntity(
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
      address,
      email,
      phone,
      birthdate,
      gender,
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
    public address: MedicalPatientEntity['address'],
    public email: MedicalPatientEntity['email'],
    public phone: MedicalPatientEntity['phone'],
    public birthdate: MedicalPatientEntity['birthdate'],
    public gender: MedicalPatientEntity['gender'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientGetByIdResponseEntity): MedicalPatientGetByIdResponseEntity {
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
      gender,
      medicalExamination,
      createdAt,
    } = obj;

    return new MedicalPatientGetByIdResponseEntity(
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
      gender,
      medicalExamination,
      createdAt,
    );
  }
}

export class MedicalPatientCreateResponseEntity implements Omit<MedicalPatientEntity, 'deleted' | 'updatedAt'> {
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
    public address: MedicalPatientEntity['address'],
    public email: MedicalPatientEntity['email'],
    public phone: MedicalPatientEntity['phone'],
    public birthdate: MedicalPatientEntity['birthdate'],
    public gender: MedicalPatientEntity['gender'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientCreateResponseEntity): MedicalPatientCreateResponseEntity {
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
      gender,
      medicalExamination,
      createdAt,
    } = obj;

    return new MedicalPatientCreateResponseEntity(
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
      gender,
      medicalExamination,
      createdAt,
    );
  }
}

export class MedicalPatientUpdateResponseEntity implements Omit<MedicalPatientEntity, 'deleted' | 'updatedAt'> {
  constructor(
    public id: MedicalPatientEntity['id'],
    public rut: MedicalPatientEntity['rut'],
    public name: MedicalPatientEntity['name'],
    public middleName: MedicalPatientEntity['middleName'],
    public lastName: MedicalPatientEntity['lastName'],
    public secondaryLastName: MedicalPatientEntity['secondaryLastName'],
    public address: MedicalPatientEntity['address'],
    public email: MedicalPatientEntity['email'],
    public phone: MedicalPatientEntity['phone'],
    public birthdate: MedicalPatientEntity['birthdate'],
    public gender: MedicalPatientEntity['gender'],
    public medicalExamination: MedicalPatientEntity['medicalExamination'],
    public createdAt: MedicalPatientEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalPatientUpdateResponseEntity): MedicalPatientUpdateResponseEntity {
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
      gender,
      medicalExamination,
      createdAt,
    } = obj;

    return new MedicalPatientUpdateResponseEntity(
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
      gender,
      medicalExamination,
      createdAt,
    );
  }
}

export class MedicalPatientResponseEntity implements Pick<MedicalPatientEntity, 'id'> {
  constructor(
    public id: MedicalPatientEntity['id'],
    public ok: boolean,
  ) {}

  public static fromJson(obj: MedicalPatientResponseEntity): MedicalPatientResponseEntity {
    const { id, ok } = obj;

    return new MedicalPatientResponseEntity(id, ok);
  }
}
