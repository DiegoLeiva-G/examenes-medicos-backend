import { AppError } from '../../../../core';
import { type MedicalExamination } from '../../../_global';
import { type TypeExam } from '@prisma/client';

export class MedicalExaminationEntity implements MedicalExamination {
  constructor(
    public id: MedicalExamination['id'],
    public dateExam: MedicalExamination['dateExam'],
    public observation: MedicalExamination['observation'],
    public observation2: MedicalExamination['observation2'],
    public dimension: MedicalExamination['dimension'],
    public dimension2: MedicalExamination['dimension2'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public anexes: MedicalExamination['anexes'],
    public anexes2: MedicalExamination['anexes2'],
    public descriptionAnexes: MedicalExamination['descriptionAnexes'],
    public conclusion: MedicalExamination['conclusion'],
    public medicalPatientId: MedicalExamination['medicalPatientId'],
    public medicalExaminationTypeId: MedicalExamination['medicalExaminationTypeId'],
    public doctorId: MedicalExamination['doctorId'],
    public deleted: MedicalExamination['deleted'],
    public createdAt: MedicalExamination['createdAt'],
    public updatedAt: MedicalExamination['updatedAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationEntity): MedicalExaminationEntity {
    const {
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      deleted,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MedicalExaminationEntity(
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class MedicalExaminationGetAllResponseEntity implements Pick<MedicalExaminationEntity, 'id'> {
  constructor(
    public id: MedicalExaminationEntity['id'],
    public dateExam: MedicalExaminationEntity['dateExam'],
    public observation: MedicalExamination['observation'],
    public observation2: MedicalExamination['observation2'],
    public dimension: MedicalExamination['dimension'],
    public dimension2: MedicalExamination['dimension2'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public anexes: MedicalExamination['anexes'],
    public anexes2: MedicalExamination['anexes2'],
    public descriptionAnexes: MedicalExamination['descriptionAnexes'],
    public conclusion: MedicalExamination['conclusion'],
    public medicalPatient: {
      id: string;
      name: string;
      lastName: string;
      rut?: string | null;
      middleName?: string | null;
      secondaryLastname?: string | null;
    },
    public doctor: {
      id: string;
      name: string;
      lastName: string;
      nameProfession: string[];
      specialization: string[];
      middleName?: string | null;
      secondaryLastname?: string | null;
    },
    public medicalExaminationType: {
      id: string;
      name: string;
      type: TypeExam;
    },
    public createdAt: MedicalExaminationEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationGetAllResponseEntity): MedicalExaminationGetAllResponseEntity {
    const {
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    } = obj;

    return new MedicalExaminationGetAllResponseEntity(
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    );
  }
}

export class MedicalExaminationGetByIdResponseEntity implements Pick<MedicalExaminationEntity, 'id'> {
  constructor(
    public id: MedicalExaminationEntity['id'],
    public dateExam: MedicalExaminationEntity['dateExam'],
    public observation: MedicalExamination['observation'],
    public observation2: MedicalExamination['observation2'],
    public dimension: MedicalExamination['dimension'],
    public dimension2: MedicalExamination['dimension2'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public anexes: MedicalExamination['anexes'],
    public anexes2: MedicalExamination['anexes2'],
    public descriptionAnexes: MedicalExamination['descriptionAnexes'],
    public conclusion: MedicalExamination['conclusion'],
    public medicalPatient: {
      id: string;
      name: string;
      lastName: string;
      rut?: string | null;
      middleName?: string | null;
      secondaryLastname?: string | null;
    },
    public doctor: {
      id: string;
      name: string;
      lastName: string;
      nameProfession: string[];
      specialization: string[];
      middleName?: string | null;
      secondaryLastname?: string | null;
    },
    public medicalExaminationType: {
      id: string;
      name: string;
      type: TypeExam;
    },
    public createdAt: MedicalExaminationEntity['createdAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationGetByIdResponseEntity): MedicalExaminationGetByIdResponseEntity {
    const {
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    } = obj;

    return new MedicalExaminationGetByIdResponseEntity(
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    );
  }
}

export class MedicalExaminationCreateResponseEntity implements Omit<MedicalExaminationEntity, 'deleted' | 'updatedAt'> {
  constructor(
    public id: MedicalExamination['id'],
    public dateExam: MedicalExamination['dateExam'],
    public observation: MedicalExamination['observation'],
    public observation2: MedicalExamination['observation2'],
    public dimension: MedicalExamination['dimension'],
    public dimension2: MedicalExamination['dimension2'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public anexes: MedicalExamination['anexes'],
    public anexes2: MedicalExamination['anexes2'],
    public descriptionAnexes: MedicalExamination['descriptionAnexes'],
    public conclusion: MedicalExamination['conclusion'],
    public medicalPatientId: MedicalExamination['medicalPatientId'],
    public medicalExaminationTypeId: MedicalExamination['medicalExaminationTypeId'],
    public doctorId: MedicalExamination['doctorId'],
    public createdAt: MedicalExamination['createdAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationCreateResponseEntity): MedicalExaminationCreateResponseEntity {
    const {
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    } = obj;

    return new MedicalExaminationCreateResponseEntity(
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    );
  }
}

export class MedicalExaminationUpdateResponseEntity
  implements Omit<MedicalExaminationEntity, 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalExamination['id'],
    public dateExam: MedicalExamination['dateExam'],
    public observation: MedicalExamination['observation'],
    public observation2: MedicalExamination['observation2'],
    public dimension: MedicalExamination['dimension'],
    public dimension2: MedicalExamination['dimension2'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public anexes: MedicalExamination['anexes'],
    public anexes2: MedicalExamination['anexes2'],
    public descriptionAnexes: MedicalExamination['descriptionAnexes'],
    public conclusion: MedicalExamination['conclusion'],
    public medicalPatientId: MedicalExamination['medicalPatientId'],
    public medicalExaminationTypeId: MedicalExamination['medicalExaminationTypeId'],
    public doctorId: MedicalExamination['doctorId'],
  ) {}

  public static fromJson(obj: MedicalExaminationUpdateResponseEntity): MedicalExaminationUpdateResponseEntity {
    const {
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    } = obj;

    return new MedicalExaminationUpdateResponseEntity(
      id,
      dateExam,
      observation,
      observation2,
      dimension,
      dimension2,
      descriptionDimension,
      anexes,
      anexes2,
      descriptionAnexes,
      conclusion,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    );
  }
}

export class MedicalExaminationDeleteResponseEntity implements Pick<MedicalExaminationEntity, 'id'> {
  constructor(public id: MedicalExaminationEntity['id']) {}

  public static fromJson(obj: MedicalExaminationDeleteResponseEntity): MedicalExaminationDeleteResponseEntity {
    const { id } = obj;

    return new MedicalExaminationDeleteResponseEntity(id);
  }
}
