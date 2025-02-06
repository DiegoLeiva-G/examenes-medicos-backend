import { AppError } from '../../../../core';
import { type MedicalExaminationType } from '@prisma/client';

export class MedicalExaminationTypeEntity implements MedicalExaminationType {
  constructor(
    public id: MedicalExaminationType['id'],
    public name: MedicalExaminationType['name'],
    public type: MedicalExaminationType['type'],
    public deleted: MedicalExaminationType['deleted'],
    public createdAt: MedicalExaminationType['createdAt'],
    public updatedAt: MedicalExaminationType['updatedAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeEntity): MedicalExaminationTypeEntity {
    const { id, name, type, deleted, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MedicalExaminationTypeEntity(id, name, type, deleted, createdAt, updatedAt);
  }
}

export class MedicalExaminationTypeGetAllResponseEntity
  implements Omit<MedicalExaminationTypeEntity, 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeGetAllResponseEntity): MedicalExaminationTypeGetAllResponseEntity {
    const { id, name, type } = obj;

    return new MedicalExaminationTypeGetAllResponseEntity(id, name, type);
  }
}

export class MedicalExaminationTypeGetByIdResponseEntity implements Pick<MedicalExaminationTypeEntity, 'id'> {
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
  ) {}

  public static fromJson(
    obj: MedicalExaminationTypeGetByIdResponseEntity,
  ): MedicalExaminationTypeGetByIdResponseEntity {
    const { id, name, type } = obj;

    return new MedicalExaminationTypeGetByIdResponseEntity(id, name, type);
  }
}

export class MedicalExaminationTypeCreateResponseEntity
  implements Omit<MedicalExaminationTypeEntity, 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeCreateResponseEntity): MedicalExaminationTypeCreateResponseEntity {
    const { id, name, type } = obj;

    return new MedicalExaminationTypeCreateResponseEntity(id, name, type);
  }
}

export class MedicalExaminationTypeUpdateResponseEntity
  implements Pick<MedicalExaminationTypeEntity, 'id' | 'name' | 'type'>
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeUpdateResponseEntity): MedicalExaminationTypeUpdateResponseEntity {
    const { id, name, type } = obj;

    return new MedicalExaminationTypeUpdateResponseEntity(id, name, type);
  }
}

export class MedicalExaminationTypeDeleteResponseEntity implements Pick<MedicalExaminationTypeEntity, 'id'> {
  constructor(public id: MedicalExaminationTypeEntity['id']) {}

  public static fromJson(obj: MedicalExaminationTypeDeleteResponseEntity): MedicalExaminationTypeDeleteResponseEntity {
    const { id } = obj;

    return new MedicalExaminationTypeDeleteResponseEntity(id);
  }
}
