import { AppError } from '../../../../core';
import { type MedicalExaminationType } from '../../../_global';

export class MedicalExaminationTypeEntity implements MedicalExaminationType {
  constructor(
    public id: MedicalExaminationType['id'],
    public name: MedicalExaminationType['name'],
    public type: MedicalExaminationType['type'],
    public observation: MedicalExaminationType['observation'],
    public dimension: MedicalExaminationType['dimension'],
    public measures: MedicalExaminationType['measures'],
    public diagnosticDimension: MedicalExaminationType['diagnosticDimension'],
    public anexes: MedicalExaminationType['anexes'],
    public diagnosticAnexes: MedicalExaminationType['diagnosticAnexes'],
    public conclusion: MedicalExaminationType['conclusion'],
    public deleted: MedicalExaminationType['deleted'],
    public createdAt: MedicalExaminationType['createdAt'],
    public updatedAt: MedicalExaminationType['updatedAt'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeEntity): MedicalExaminationTypeEntity {
    const {
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
      deleted,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MedicalExaminationTypeEntity(
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
      deleted,
      createdAt,
      updatedAt,
    );
  }
}

export class MedicalExaminationTypeGetAllResponseEntity
  implements Omit<MedicalExaminationTypeEntity, 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
    public observation: MedicalExaminationType['observation'],
    public dimension: MedicalExaminationType['dimension'],
    public measures: MedicalExaminationType['measures'],
    public diagnosticDimension: MedicalExaminationType['diagnosticDimension'],
    public anexes: MedicalExaminationType['anexes'],
    public diagnosticAnexes: MedicalExaminationType['diagnosticAnexes'],
    public conclusion: MedicalExaminationType['conclusion'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeGetAllResponseEntity): MedicalExaminationTypeGetAllResponseEntity {
    const {
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    } = obj;

    return new MedicalExaminationTypeGetAllResponseEntity(
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    );
  }
}

export class MedicalExaminationTypeGetByIdResponseEntity implements Pick<MedicalExaminationTypeEntity, 'id'> {
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
    public observation: MedicalExaminationType['observation'],
    public dimension: MedicalExaminationType['dimension'],
    public measures: MedicalExaminationType['measures'],
    public diagnosticDimension: MedicalExaminationType['diagnosticDimension'],
    public anexes: MedicalExaminationType['anexes'],
    public diagnosticAnexes: MedicalExaminationType['diagnosticAnexes'],
    public conclusion: MedicalExaminationType['conclusion'],
  ) {}

  public static fromJson(
    obj: MedicalExaminationTypeGetByIdResponseEntity,
  ): MedicalExaminationTypeGetByIdResponseEntity {
    const {
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    } = obj;

    return new MedicalExaminationTypeGetByIdResponseEntity(
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    );
  }
}

export class MedicalExaminationTypeCreateResponseEntity
  implements Omit<MedicalExaminationTypeEntity, 'deleted' | 'createdAt' | 'updatedAt'>
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
    public observation: MedicalExaminationType['observation'],
    public dimension: MedicalExaminationType['dimension'],
    public measures: MedicalExaminationType['measures'],
    public diagnosticDimension: MedicalExaminationType['diagnosticDimension'],
    public anexes: MedicalExaminationType['anexes'],
    public diagnosticAnexes: MedicalExaminationType['diagnosticAnexes'],
    public conclusion: MedicalExaminationType['conclusion'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeCreateResponseEntity): MedicalExaminationTypeCreateResponseEntity {
    const {
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    } = obj;

    return new MedicalExaminationTypeCreateResponseEntity(
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    );
  }
}

export class MedicalExaminationTypeUpdateResponseEntity
  implements
    Pick<
      MedicalExaminationTypeEntity,
      | 'id'
      | 'name'
      | 'type'
      | 'observation'
      | 'dimension'
      | 'measures'
      | 'diagnosticDimension'
      | 'anexes'
      | 'diagnosticAnexes'
      | 'conclusion'
    >
{
  constructor(
    public id: MedicalExaminationTypeEntity['id'],
    public name: MedicalExaminationTypeEntity['name'],
    public type: MedicalExaminationTypeEntity['type'],
    public observation: MedicalExaminationType['observation'],
    public dimension: MedicalExaminationType['dimension'],
    public measures: MedicalExaminationType['measures'],
    public diagnosticDimension: MedicalExaminationType['diagnosticDimension'],
    public anexes: MedicalExaminationType['anexes'],
    public diagnosticAnexes: MedicalExaminationType['diagnosticAnexes'],
    public conclusion: MedicalExaminationType['conclusion'],
  ) {}

  public static fromJson(obj: MedicalExaminationTypeUpdateResponseEntity): MedicalExaminationTypeUpdateResponseEntity {
    const {
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    } = obj;

    return new MedicalExaminationTypeUpdateResponseEntity(
      id,
      name,
      type,
      observation,
      dimension,
      measures,
      diagnosticDimension,
      anexes,
      diagnosticAnexes,
      conclusion,
    );
  }
}

export class MedicalExaminationTypeDeleteResponseEntity implements Pick<MedicalExaminationTypeEntity, 'id'> {
  constructor(public id: MedicalExaminationTypeEntity['id']) {}

  public static fromJson(obj: MedicalExaminationTypeDeleteResponseEntity): MedicalExaminationTypeDeleteResponseEntity {
    const { id } = obj;

    return new MedicalExaminationTypeDeleteResponseEntity(id);
  }
}
