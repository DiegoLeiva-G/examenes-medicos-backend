import { type PlannerSubsidy } from '@prisma/client';
import { AppError } from '../../../../core';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';
import { type CostCenterEntity } from '../../../costCenter';

interface IPlannerSubsidyExtended extends PlannerSubsidy {}

export class PlannerSubsidyEntity implements IPlannerSubsidyExtended {
  constructor(
    public id: PlannerSubsidy['id'],
    public managementAreaCodeReference: PlannerSubsidy['managementAreaCodeReference'],
    public directorateCodeReference: PlannerSubsidy['directorateCodeReference'],
    public costCenterCodeReference: PlannerSubsidy['costCenterCodeReference'],
    public observation: PlannerSubsidy['observation'],
    public plannerId: PlannerSubsidy['plannerId'],
    public archived: PlannerSubsidy['archived'],
    public createdAt: PlannerSubsidy['createdAt'],
  ) {}

  public static fromJson(obj: PlannerSubsidyEntity): PlannerSubsidyEntity {
    const {
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      observation,
      plannerId,
      archived,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSubsidyEntity(
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      observation,
      plannerId,
      archived,
      createdAt,
    );
  }
}

// TODO: add tasks
export class PlannerSubsidySummaryEntity implements Pick<PlannerSubsidyEntity, 'id'> {
  constructor(
    public id: PlannerSubsidy['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerSubsidySummaryEntity): PlannerSubsidySummaryEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerSubsidySummaryEntity(id, managementArea, directorate, costCenter);
  }
}
