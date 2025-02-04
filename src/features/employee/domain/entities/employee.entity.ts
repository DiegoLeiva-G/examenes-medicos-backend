import { type Employee } from '@prisma/client';
import { AppError } from '../../../../core';
import { type UserEntity } from '../../../user';
import { type CityEntity } from '../../../locations';
import { type PersonEntity, type PersonEntityToList } from '../../../person';

interface IEmployeeExtended extends Employee {
  person?: PersonEntity | null;
  user?: UserEntity;
  city?: CityEntity;
  employeeRole?: unknown;
  employeeLabor?: unknown;
  responsibleDepartment?: unknown;
}

export class EmployeeEntity implements IEmployeeExtended {
  constructor(
    public id: Employee['id'],
    public address: Employee['address'],
    public phone: Employee['phone'],
    public email: Employee['email'],
    public studyLevel: Employee['studyLevel'],
    public studyDescription: Employee['studyDescription'],
    public personId: Employee['personId'],
    public userId: Employee['userId'],
    public cityId: Employee['cityId'],
    public employeeRoleId: Employee['employeeRoleId'],
    public employeeLaborId: Employee['employeeLaborId'],
    public enabled: Employee['enabled'],
    public archived: Employee['archived'],
    public createdAt: Employee['createdAt'],
    public updatedAt: Employee['updatedAt'],
    public person?: PersonEntity | null,
  ) {}

  public static fromJson(obj: EmployeeEntity): EmployeeEntity {
    const {
      id,
      address,
      phone,
      email,
      studyLevel,
      studyDescription,
      personId,
      userId,
      cityId,
      employeeRoleId,
      employeeLaborId,
      enabled,
      archived,
      createdAt,
      updatedAt,
      person,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new EmployeeEntity(
      id,
      address,
      phone,
      email,
      studyLevel,
      studyDescription,
      personId,
      userId,
      cityId,
      employeeRoleId,
      employeeLaborId,
      enabled,
      archived,
      createdAt,
      updatedAt,
      person,
    );
  }
}

export class EmployeeEntityToList implements Pick<EmployeeEntity, 'id' | 'email' | 'enabled'> {
  constructor(
    public id: Employee['id'],
    public email: Employee['email'],
    public enabled: Employee['enabled'],
    public person?: PersonEntityToList | null,
  ) {}

  public static fromJson(obj: EmployeeEntityToList): EmployeeEntityToList {
    const { id, email, enabled, person } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new EmployeeEntityToList(id, email, enabled, person);
  }
}
