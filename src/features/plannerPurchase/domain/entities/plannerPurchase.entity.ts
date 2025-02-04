import { type PlannerPurchase } from '@prisma/client';
import { AppError } from '../../../../core';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';
import { type CostCenterEntity } from '../../../costCenter';

interface IPlannerPurchaseExtended extends PlannerPurchase {}

export class PlannerPurchaseEntity implements IPlannerPurchaseExtended {
  constructor(
    public id: PlannerPurchase['id'],
    public managementAreaCodeReference: PlannerPurchase['managementAreaCodeReference'],
    public directorateCodeReference: PlannerPurchase['directorateCodeReference'],
    public costCenterCodeReference: PlannerPurchase['costCenterCodeReference'],
    public plannerId: PlannerPurchase['plannerId'],
    public archived: PlannerPurchase['archived'],
    public createdAt: PlannerPurchase['createdAt'],
  ) {}

  public static fromJson(obj: PlannerPurchaseEntity): PlannerPurchaseEntity {
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

    return new PlannerPurchaseEntity(
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
export class PlannerPurchaseSummaryEntity implements Pick<PlannerPurchaseEntity, 'id'> {
  constructor(
    public id: PlannerPurchase['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerPurchaseSummaryEntity): PlannerPurchaseSummaryEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerPurchaseSummaryEntity(id, managementArea, directorate, costCenter);
  }
}
