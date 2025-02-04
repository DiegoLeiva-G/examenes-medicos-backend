import { type ImprovementProject } from '@prisma/client';
import { AppError } from '../../../../core';
import { type FundingSourceEntity, type FundingSourceSummaryEntity } from '../../../fundingSource';
import { type SpecificPladecoEntity, type SpecificPladecoToListEntity } from '../../../pladeco';
import { type DirectorateEntity } from '../../../directorate';

interface IImprovementProjectExtended extends Omit<ImprovementProject, 'archived' | 'createdAt' | 'updatedAt'> {
  createdAt?: ImprovementProject['createdAt'];
  fundingSource?: FundingSourceEntity;
  specificPladeco: SpecificPladecoEntity[];
}

export class ImprovementProjectEntity implements IImprovementProjectExtended {
  constructor(
    public id: ImprovementProject['id'],
    public name: ImprovementProject['name'],
    public directorateResponsibleCodeReference: ImprovementProject['directorateResponsibleCodeReference'],
    public startDate: ImprovementProject['startDate'],
    public endDate: ImprovementProject['endDate'],
    public legalNorms: ImprovementProject['legalNorms'],
    public fundingSourceId: ImprovementProject['fundingSourceId'],
    public specificPladeco: SpecificPladecoEntity[],
    public enabled: ImprovementProject['enabled'],
    public createdAt?: ImprovementProject['createdAt'],
  ) {}

  public static fromJson(obj: ImprovementProjectEntity): ImprovementProjectEntity {
    const {
      id,
      name,
      directorateResponsibleCodeReference,
      startDate,
      endDate,
      legalNorms,
      fundingSourceId,
      specificPladeco,
      enabled,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new ImprovementProjectEntity(
      id,
      name,
      directorateResponsibleCodeReference,
      startDate,
      endDate,
      legalNorms,
      fundingSourceId,
      specificPladeco,
      enabled,
      createdAt,
    );
  }
}

export class ImprovementProjectEntityToList
  implements Pick<ImprovementProjectEntity, 'id' | 'name' | 'startDate' | 'endDate'>
{
  constructor(
    public id: ImprovementProject['id'],
    public name: ImprovementProject['name'],
    public directorateResponsible: string,
    public startDate: ImprovementProject['startDate'],
    public endDate: ImprovementProject['endDate'],
  ) {}

  public static fromJson(obj: ImprovementProjectEntityToList): ImprovementProjectEntityToList {
    const { id, name, directorateResponsible, startDate, endDate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new ImprovementProjectEntityToList(id, name, directorateResponsible, startDate, endDate);
  }
}

export class ImprovementProjectSummaryEntity
  implements Pick<ImprovementProjectEntity, 'id' | 'name' | 'startDate' | 'endDate' | 'legalNorms'>
{
  constructor(
    public id: ImprovementProject['id'],
    public name: ImprovementProject['name'],
    public directorateResponsible: DirectorateEntity,
    public specificPladeco: SpecificPladecoToListEntity[],
    public startDate: ImprovementProject['startDate'],
    public endDate: ImprovementProject['endDate'],
    public legalNorms: ImprovementProject['legalNorms'],
    public fundingSource?: FundingSourceSummaryEntity | null,
  ) {}

  public static fromJson(obj: ImprovementProjectSummaryEntity): ImprovementProjectSummaryEntity {
    const { id, name, directorateResponsible, specificPladeco, startDate, endDate, legalNorms, fundingSource } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new ImprovementProjectSummaryEntity(
      id,
      name,
      directorateResponsible,
      specificPladeco,
      startDate,
      endDate,
      legalNorms,
      fundingSource,
    );
  }
}

export class ImprovementProjectToPlannerEntity
  implements Pick<ImprovementProjectSummaryEntity, 'id' | 'name' | 'directorateResponsible'>
{
  constructor(
    public id: ImprovementProject['id'],
    public name: ImprovementProject['name'],
    public directorateResponsible: DirectorateEntity,
  ) {}

  public static fromJson(obj: ImprovementProjectToPlannerEntity): ImprovementProjectToPlannerEntity {
    const { id, name, directorateResponsible } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new ImprovementProjectToPlannerEntity(id, name, directorateResponsible);
  }
}
