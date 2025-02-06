import { AppError } from '../../../../core';
import { type MedicalExamination, type TypeExam } from '@prisma/client';

export class MedicalExaminationEntity implements MedicalExamination {
  constructor(
    public id: MedicalExamination['id'],
    public dateExam: MedicalExamination['dateExam'],
    public observation: MedicalExamination['observation'],
    public anexes: MedicalExamination['anexes'],
    public conclusion: MedicalExamination['conclusion'],
    public titleDimension: MedicalExamination['titleDimension'],
    public nameDimension: MedicalExamination['nameDimension'],
    public measureDimension: MedicalExamination['measureDimension'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
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
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
    public observation: MedicalExaminationEntity['observation'],
    public anexes: MedicalExaminationEntity['anexes'],
    public conclusion: MedicalExaminationEntity['conclusion'],
    public titleDimension: MedicalExaminationEntity['titleDimension'],
    public nameDimension: MedicalExaminationEntity['nameDimension'],
    public measureDimension: MedicalExaminationEntity['measureDimension'],
    public descriptionDimension: MedicalExaminationEntity['descriptionDimension'],
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
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    } = obj;

    return new MedicalExaminationGetAllResponseEntity(
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
    public observation: MedicalExaminationEntity['observation'],
    public anexes: MedicalExaminationEntity['anexes'],
    public conclusion: MedicalExaminationEntity['conclusion'],
    public titleDimension: MedicalExaminationEntity['titleDimension'],
    public nameDimension: MedicalExaminationEntity['nameDimension'],
    public measureDimension: MedicalExaminationEntity['measureDimension'],
    public descriptionDimension: MedicalExaminationEntity['descriptionDimension'],
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
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatient,
      doctor,
      medicalExaminationType,
      createdAt,
    } = obj;

    return new MedicalExaminationGetByIdResponseEntity(
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
    public anexes: MedicalExamination['anexes'],
    public conclusion: MedicalExamination['conclusion'],
    public titleDimension: MedicalExamination['titleDimension'],
    public nameDimension: MedicalExamination['nameDimension'],
    public measureDimension: MedicalExamination['measureDimension'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
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
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    } = obj;

    return new MedicalExaminationCreateResponseEntity(
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
    public anexes: MedicalExamination['anexes'],
    public conclusion: MedicalExamination['conclusion'],
    public titleDimension: MedicalExamination['titleDimension'],
    public nameDimension: MedicalExamination['nameDimension'],
    public measureDimension: MedicalExamination['measureDimension'],
    public descriptionDimension: MedicalExamination['descriptionDimension'],
    public medicalPatientId: MedicalExamination['medicalPatientId'],
    public medicalExaminationTypeId: MedicalExamination['medicalExaminationTypeId'],
    public doctorId: MedicalExamination['doctorId'],
  ) {}

  public static fromJson(obj: MedicalExaminationUpdateResponseEntity): MedicalExaminationUpdateResponseEntity {
    const {
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    } = obj;

    return new MedicalExaminationUpdateResponseEntity(
      id,
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
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
