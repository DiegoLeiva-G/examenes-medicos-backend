import { type City } from '@prisma/client';
import { AppError } from '../../../../core';
import { type SubStateEntity, type SubStateToSelectEntity } from './subState.entity';

export interface ICityExtended extends City {
  subState?: SubStateEntity;
}

export class CityEntity implements ICityExtended {
  constructor(
    public id: City['id'],
    public name: City['name'],
    public subStateId: City['subStateId'],
    public archived: City['archived'],
    public createdAt: City['createdAt'],
    public updatedAt: City['updatedAt'],
    public subState?: SubStateEntity,
  ) {}

  public static fromJson(obj: CityEntity): CityEntity {
    const { id, name, subStateId, archived, createdAt, updatedAt, subState } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new CityEntity(id, name, subStateId, archived, createdAt, updatedAt, subState);
  }
}

export class CityToSelectEntity implements Pick<CityEntity, 'id' | 'name'> {
  constructor(
    public id: City['id'],
    public name: City['name'],
    public subState?: SubStateToSelectEntity[],
  ) {}

  public static fromJson(obj: CityToSelectEntity): CityToSelectEntity {
    const { id, name, subState } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new CityToSelectEntity(id, name, subState);
  }
}
