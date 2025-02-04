import { type PlannerCouncilorSalary } from '@prisma/client';
import { AppError } from '../../../../core';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';
import { type CostCenterEntity } from '../../../costCenter';

export class PlannerCouncilorSalaryEntity implements PlannerCouncilorSalary {
  constructor(
    public id: PlannerCouncilorSalary['id'],
    public managementAreaCodeReference: PlannerCouncilorSalary['managementAreaCodeReference'],
    public directorateCodeReference: PlannerCouncilorSalary['directorateCodeReference'],
    public costCenterCodeReference: PlannerCouncilorSalary['costCenterCodeReference'],
    public observation: PlannerCouncilorSalary['observation'],
    public plannerId: PlannerCouncilorSalary['plannerId'],
    public archived: PlannerCouncilorSalary['archived'],
    public createdAt: PlannerCouncilorSalary['createdAt'],
  ) {}

  public static fromJson(obj: PlannerCouncilorSalaryEntity): PlannerCouncilorSalaryEntity {
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

    return new PlannerCouncilorSalaryEntity(
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
export class PlannerCouncilorSalaryCreateResponseEntity implements Pick<PlannerCouncilorSalaryEntity, 'id'> {
  constructor(
    public id: PlannerCouncilorSalary['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(obj: PlannerCouncilorSalaryCreateResponseEntity): PlannerCouncilorSalaryCreateResponseEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerCouncilorSalaryCreateResponseEntity(id, managementArea, directorate, costCenter);
  }
}

export class PlannerCouncilorSalaryGetByIdResponseEntity implements Pick<PlannerCouncilorSalaryEntity, 'id'> {
  constructor(
    public id: PlannerCouncilorSalary['id'],
    public managementArea: ManagementAreaEntity,
    public directorate: DirectorateEntity,
    public costCenter: CostCenterEntity,
  ) {}

  public static fromJson(
    obj: PlannerCouncilorSalaryGetByIdResponseEntity,
  ): PlannerCouncilorSalaryGetByIdResponseEntity {
    const { id, managementArea, directorate, costCenter } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new PlannerCouncilorSalaryGetByIdResponseEntity(id, managementArea, directorate, costCenter);
  }
}
