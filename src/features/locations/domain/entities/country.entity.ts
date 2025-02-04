import { type Country } from '@prisma/client';
import { AppError } from '../../../../core';
import { type StateEntity, type StateToSelectEntity } from './state.entity';

interface ICountryExtended extends Country {
  state?: StateEntity[];
  person?: unknown[];
}

export class CountryEntity implements ICountryExtended {
  constructor(
    public id: Country['id'],
    public name: Country['name'],
    public code: Country['code'],
    public nationality: Country['nationality'],
    public demonym: Country['demonym'],
    public state?: StateEntity[],
  ) {}

  public static fromJson(obj: CountryEntity): CountryEntity {
    const { id, name, code, nationality, demonym, state } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new CountryEntity(id, name, code, nationality, demonym, state);
  }
}

export class CountryToSelectEntity implements Pick<CountryEntity, 'id' | 'name'> {
  constructor(
    public id: Country['id'],
    public name: Country['name'],
    public state?: StateToSelectEntity[],
  ) {}

  public static fromJson(obj: CountryToSelectEntity): CountryToSelectEntity {
    const { id, name, state } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new CountryToSelectEntity(id, name, state);
  }
}
