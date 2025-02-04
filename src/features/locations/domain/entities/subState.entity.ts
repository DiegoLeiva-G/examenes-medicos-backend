import { type SubState } from '@prisma/client';
import { AppError } from '../../../../core';
import { type StateEntity, type StateToSelectEntity } from './state.entity';
import { type CityEntity, type CityToSelectEntity } from './city.entity';

interface ISubStateExtended extends SubState {
  state?: StateEntity;
  city?: CityEntity[];
}

export class SubStateEntity implements ISubStateExtended {
  constructor(
    public id: SubState['id'],
    public name: SubState['name'],
    public stateId: SubState['stateId'],
    public state?: StateEntity,
    public city?: CityEntity[],
  ) {}

  public static fromJson(obj: SubStateEntity): SubStateEntity {
    const { id, name, stateId, state, city } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new SubStateEntity(id, name, stateId, state, city);
  }
}

export class SubStateToSelectEntity implements Pick<SubStateEntity, 'id' | 'name'> {
  constructor(
    public id: SubState['id'],
    public name: SubState['name'],
    public city?: CityToSelectEntity[],
    public state?: StateToSelectEntity,
  ) {}

  public static fromJson(obj: SubStateToSelectEntity): SubStateToSelectEntity {
    const { id, name, city } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new SubStateToSelectEntity(id, name, city);
  }
}
