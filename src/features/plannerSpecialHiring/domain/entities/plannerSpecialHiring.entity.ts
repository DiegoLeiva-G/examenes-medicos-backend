import { type PlannerSpecialHiring } from '@prisma/client';
import { AppError } from '../../../../core';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';
import { type CostCenterEntity } from '../../../costCenter';
import { type InvestmentInitiativeEntity } from '../../../investmentInitiative';
import { type PlannerEntity } from '../../../planner';
import { type ImprovementProjectEntity } from '../../../improvementProject';

interface IPlannerSpecialHiringExtended extends PlannerSpecialHiring {}

export class PlannerSpecialHiringEntity implements IPlannerSpecialHiringExtended {
  constructor(
    public id: PlannerSpecialHiring['id'],
    public managementAreaCodeReference: PlannerSpecialHiring['managementAreaCodeReference'],
    public directorateCodeReference: PlannerSpecialHiring['directorateCodeReference'],
    public costCenterCodeReference: PlannerSpecialHiring['costCenterCodeReference'],
    public status: PlannerSpecialHiring['status'],
    public observation: PlannerSpecialHiring['observation'],
    public plannerId: PlannerSpecialHiring['plannerId'],
    public archived: PlannerSpecialHiring['archived'],
    public createdAt: PlannerSpecialHiring['createdAt'],
  ) {}

  public static fromJson(obj: PlannerSpecialHiringEntity): PlannerSpecialHiringEntity {
    const {
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      status,
      observation,
      plannerId,
      archived,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringEntity(
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      status,
      observation,
      plannerId,
      archived,
      createdAt,
    );
  }
}

export class PlannerSpecialHiringGetByIdResponseEntity implements Pick<PlannerSpecialHiringEntity, 'id' | 'status'> {
  constructor(
    public id: PlannerSpecialHiring['id'],
    public status: PlannerSpecialHiring['status'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerSpecialHiringGetByIdResponseEntity): PlannerSpecialHiringGetByIdResponseEntity {
    const { id, status, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringGetByIdResponseEntity(id, status, managementArea, directorate, costCenter);
  }
}

export class PlannerSpecialHiringRequestResponseEntity implements Pick<PlannerSpecialHiringEntity, 'id'> {
  constructor(
    public id: PlannerSpecialHiring['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerSpecialHiringRequestResponseEntity): PlannerSpecialHiringRequestResponseEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringRequestResponseEntity(id, managementArea, directorate, costCenter);
  }
}

export class PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity
  implements Pick<PlannerSpecialHiringEntity, 'id'>
{
  constructor(
    public id: PlannerSpecialHiring['id'],
    public planner: {
      id: PlannerEntity['id'];
      name: PlannerEntity['name'];
      year: PlannerEntity['year'];
      investmentInitiative: Pick<InvestmentInitiativeEntity, 'id' | 'name'> | null;
    } | null,
    public directorate: DirectorateEntity,
  ) {}

  public static fromJson(
    obj: PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
  ): PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity {
    const { id, planner, directorate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity(id, planner, directorate);
  }
}

export class PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity
  implements Pick<PlannerSpecialHiringEntity, 'id'>
{
  constructor(
    public id: PlannerSpecialHiring['id'],
    public planner: {
      id: PlannerEntity['id'];
      name: PlannerEntity['name'];
      year: PlannerEntity['year'];
      investmentInitiative: Pick<InvestmentInitiativeEntity, 'id' | 'name'> | null;
    } | null,
    public directorate: DirectorateEntity,
  ) {}

  public static fromJson(
    obj: PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity,
  ): PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity {
    const { id, planner, directorate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity(id, planner, directorate);
  }
}

export class PlannerSpecialHiringGetAllImprovementProjectResponseEntity
  implements Pick<PlannerSpecialHiringEntity, 'id'>
{
  constructor(
    public id: PlannerSpecialHiring['id'],
    public planner: {
      id: PlannerEntity['id'];
      name: PlannerEntity['name'];
      year: PlannerEntity['year'];
      improvementProject: Pick<ImprovementProjectEntity, 'id' | 'name'> | null;
    } | null,
    public directorate: DirectorateEntity,
  ) {}

  public static fromJson(
    obj: PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
  ): PlannerSpecialHiringGetAllImprovementProjectResponseEntity {
    const { id, planner, directorate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringGetAllImprovementProjectResponseEntity(id, planner, directorate);
  }
}

export class PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity
  implements Pick<PlannerSpecialHiringEntity, 'id'>
{
  constructor(
    public id: PlannerSpecialHiring['id'],
    public planner: {
      id: PlannerEntity['id'];
      name: PlannerEntity['name'];
      year: PlannerEntity['year'];
      improvementProject: Pick<ImprovementProjectEntity, 'id' | 'name'> | null;
    } | null,
    public directorate: DirectorateEntity,
  ) {}

  public static fromJson(
    obj: PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity,
  ): PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity {
    const { id, planner, directorate } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity(id, planner, directorate);
  }
}

export class PlannerSpecialHiringRequestDeterminationResponseEntity
  implements Pick<PlannerSpecialHiringEntity, 'id' | 'status'>
{
  constructor(
    public id: PlannerSpecialHiring['id'],
    public status: PlannerSpecialHiring['status'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(
    obj: PlannerSpecialHiringRequestDeterminationResponseEntity,
  ): PlannerSpecialHiringRequestDeterminationResponseEntity {
    const { id, status, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSpecialHiringRequestDeterminationResponseEntity(
      id,
      status,
      managementArea,
      directorate,
      costCenter,
    );
  }
}
