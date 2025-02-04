import { type InvestmentInitiative } from '@prisma/client';
import { AppError } from '../../../../core';
import { type FundingSourceEntity, type FundingSourceSummaryEntity } from '../../../fundingSource';
import { type SpecificPladecoEntity, type SpecificPladecoToListEntity } from '../../../pladeco';
import { type DirectorateEntity } from '../../../directorate';

interface IInvestmentInitiativeExtended extends Omit<InvestmentInitiative, 'archived' | 'createdAt' | 'updatedAt'> {
  createdAt?: InvestmentInitiative['createdAt'];
  fundingSource: FundingSourceEntity[];
  specificPladeco: SpecificPladecoEntity[];
}

export class InvestmentInitiativeEntity implements IInvestmentInitiativeExtended {
  constructor(
    public id: InvestmentInitiative['id'],
    public name: InvestmentInitiative['name'],
    public directorateResponsibleCodeReference: InvestmentInitiative['directorateResponsibleCodeReference'],
    public directorateCoResponsibleCodeReference: InvestmentInitiative['directorateCoResponsibleCodeReference'],
    public startDate: InvestmentInitiative['startDate'],
    public endDate: InvestmentInitiative['endDate'],
    public legalNorms: InvestmentInitiative['legalNorms'],
    public fundingSource: FundingSourceEntity[],
    public specificPladeco: SpecificPladecoEntity[],
    public enabled: InvestmentInitiative['enabled'],
    public createdAt?: InvestmentInitiative['createdAt'],
  ) {}

  public static fromJson(obj: InvestmentInitiativeEntity): InvestmentInitiativeEntity {
    const {
      id,
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      startDate,
      endDate,
      legalNorms,
      fundingSource,
      specificPladeco,
      enabled,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new InvestmentInitiativeEntity(
      id,
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      startDate,
      endDate,
      legalNorms,
      fundingSource,
      specificPladeco,
      enabled,
      createdAt,
    );
  }
}

export class InvestmentInitiativeEntityToList
  implements Pick<InvestmentInitiativeEntity, 'id' | 'name' | 'startDate' | 'endDate'>
{
  constructor(
    public id: InvestmentInitiative['id'],
    public name: InvestmentInitiative['name'],
    public directorateResponsible: string,
    public startDate: InvestmentInitiative['startDate'],
    public endDate: InvestmentInitiative['endDate'],
  ) {}

  public static fromJson(obj: InvestmentInitiativeEntityToList): InvestmentInitiativeEntityToList {
    const { id, name, directorateResponsible, startDate, endDate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new InvestmentInitiativeEntityToList(id, name, directorateResponsible, startDate, endDate);
  }
}

export class InvestmentInitiativeSummaryEntity
  implements Pick<InvestmentInitiativeEntity, 'id' | 'name' | 'startDate' | 'endDate' | 'legalNorms'>
{
  constructor(
    public id: InvestmentInitiative['id'],
    public name: InvestmentInitiative['name'],
    public directorateResponsible: DirectorateEntity,
    public directorateCoResponsible: DirectorateEntity[],
    public fundingSource: FundingSourceSummaryEntity[],
    public specificPladeco: SpecificPladecoToListEntity[],
    public startDate: InvestmentInitiative['startDate'],
    public endDate: InvestmentInitiative['endDate'],
    public legalNorms: InvestmentInitiative['legalNorms'],
  ) {}

  public static fromJson(obj: InvestmentInitiativeSummaryEntity): InvestmentInitiativeSummaryEntity {
    const {
      id,
      name,
      directorateResponsible,
      directorateCoResponsible,
      fundingSource,
      specificPladeco,
      startDate,
      endDate,
      legalNorms,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new InvestmentInitiativeSummaryEntity(
      id,
      name,
      directorateResponsible,
      directorateCoResponsible,
      fundingSource,
      specificPladeco,
      startDate,
      endDate,
      legalNorms,
    );
  }
}

export class InvestmentInitiativeToPlannerEntity
  implements Pick<InvestmentInitiativeSummaryEntity, 'id' | 'name' | 'directorateResponsible'>
{
  constructor(
    public id: InvestmentInitiative['id'],
    public name: InvestmentInitiative['name'],
    public directorateResponsible: DirectorateEntity,
  ) {}

  public static fromJson(obj: InvestmentInitiativeToPlannerEntity): InvestmentInitiativeToPlannerEntity {
    const { id, name, directorateResponsible } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new InvestmentInitiativeToPlannerEntity(id, name, directorateResponsible);
  }
}
