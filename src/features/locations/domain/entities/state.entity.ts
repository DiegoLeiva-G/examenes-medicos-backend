import { type State } from '@prisma/client';
import { AppError } from '../../../../core';
import { type CountryEntity, type CountryToSelectEntity } from './country.entity';
import { type SubStateEntity, type SubStateToSelectEntity } from './subState.entity';

interface IStateExtended extends State {
  country?: CountryEntity;
  subState?: SubStateEntity[];
}

export class StateEntity implements IStateExtended {
  constructor(
    public id: State['id'],
    public name: State['name'],
    public code: State['code'],
    public correlative: State['correlative'],
    public countryId: State['countryId'],
    public country?: CountryEntity,
    public subState?: SubStateEntity[],
  ) {}

  public static fromJson(obj: StateEntity): StateEntity {
    const { id, name, code, correlative, countryId, country, subState } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new StateEntity(id, name, code, correlative, countryId, country, subState);
  }
}

export class StateToSelectEntity implements Pick<StateEntity, 'id' | 'name'> {
  constructor(
    public id: State['id'],
    public name: State['name'],
    public country?: CountryToSelectEntity,
    public subState?: SubStateToSelectEntity[],
  ) {}

  public static fromJson(obj: StateToSelectEntity): StateToSelectEntity {
    const { id, name, country, subState } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new StateToSelectEntity(id, name, country, subState);
  }
}
