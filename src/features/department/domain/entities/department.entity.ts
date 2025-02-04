import { AppError } from '../../../../core';
import { type Department } from '@prisma/client';
import { type EmployeeEntity } from '../../../employee';

interface IDepartmentExtended extends Department {
  subDepartment?: DepartmentEntity | null;
  employeeResponsible?: EmployeeEntity | null;
  employee?: EmployeeEntity[] | null;
}

export class DepartmentEntity implements IDepartmentExtended {
  constructor(
    public id: Department['id'],
    public name: Department['name'],
    public directorateCodeReference: Department['directorateCodeReference'],
    public description: Department['description'],
    public correlative: Department['correlative'],
    public code: Department['code'],
    public subDepartmentId: Department['subDepartmentId'],
    public employeeResponsibleId: Department['employeeResponsibleId'],
    public enabled: Department['enabled'],
    public archived: Department['archived'],
    public createdAt: Department['createdAt'],
    public updatedAt: Department['updatedAt'],
  ) {}

  public static fromJson(obj: DepartmentEntity): DepartmentEntity {
    const {
      id,
      name,
      directorateCodeReference,
      description,
      correlative,
      code,
      subDepartmentId,
      employeeResponsibleId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new DepartmentEntity(
      id,
      name,
      directorateCodeReference,
      description,
      correlative,
      code,
      subDepartmentId,
      employeeResponsibleId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class DepartmentSummaryEntity
  implements
    Pick<DepartmentEntity, 'id' | 'name' | 'directorateCodeReference' | 'description' | 'subDepartmentId' | 'enabled'>
{
  constructor(
    public id: Department['id'],
    public name: Department['name'],
    public directorateCodeReference: Department['directorateCodeReference'],
    public description: Department['description'],
    public subDepartmentId: Department['subDepartmentId'],
    public enabled: Department['enabled'],
  ) {}

  public static fromJson(obj: DepartmentSummaryEntity): DepartmentSummaryEntity {
    const { id, name, directorateCodeReference, description, subDepartmentId, enabled } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new DepartmentSummaryEntity(id, name, directorateCodeReference, description, subDepartmentId, enabled);
  }
}
