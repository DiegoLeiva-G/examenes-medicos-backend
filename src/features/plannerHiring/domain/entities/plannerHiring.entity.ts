import { type PlannerHiring } from '@prisma/client';
import { AppError } from '../../../../core';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';
import { type CostCenterEntity } from '../../../costCenter';

interface IPlannerHiringExtended extends PlannerHiring {}

export class PlannerHiringEntity implements IPlannerHiringExtended {
  constructor(
    public id: PlannerHiring['id'],
    public managementAreaCodeReference: PlannerHiring['managementAreaCodeReference'],
    public directorateCodeReference: PlannerHiring['directorateCodeReference'],
    public costCenterCodeReference: PlannerHiring['costCenterCodeReference'],
    public plannerId: PlannerHiring['plannerId'],
    public archived: PlannerHiring['archived'],
    public createdAt: PlannerHiring['createdAt'],
  ) {}

  public static fromJson(obj: PlannerHiringEntity): PlannerHiringEntity {
    const {
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      plannerId,
      archived,
      createdAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerHiringEntity(
      id,
      managementAreaCodeReference,
      directorateCodeReference,
      costCenterCodeReference,
      plannerId,
      archived,
      createdAt,
    );
  }
}

// TODO: add tasks
export class PlannerHiringSummaryEntity implements Pick<PlannerHiringEntity, 'id'> {
  constructor(
    public id: PlannerHiring['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerHiringSummaryEntity): PlannerHiringSummaryEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerHiringSummaryEntity(id, managementArea, directorate, costCenter);
  }
}
