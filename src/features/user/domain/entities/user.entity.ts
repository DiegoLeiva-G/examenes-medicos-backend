import { type User } from '@prisma/client';
import { AppError } from '../../../../core';

export interface IUserExtended extends User {
  employee?: unknown;
}

export class UserEntity implements IUserExtended {
  constructor(
    public id: User['id'],
    public type: User['type'],
    public username: User['username'],
    public password: User['password'],
    public tag: User['tag'],
    public root: User['root'],
    public enabled: User['enabled'],
    public archived: User['archived'],
    public createdAt: User['createdAt'],
    public updatedAt: User['updatedAt'],
  ) {}

  public static fromJson(obj: IUserExtended): UserEntity {
    const { id, type, username, password, tag, root, enabled, archived, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new UserEntity(id, type, username, password, tag, root, enabled, archived, createdAt, updatedAt);
  }
}

export class UserAuthEntity implements Pick<UserEntity, 'id' | 'type' | 'username' | 'tag' | 'root' | 'enabled'> {
  constructor(
    public id: User['id'],
    public type: User['type'],
    public username: User['username'],
    public tag: User['tag'],
    public root: User['root'],
    public enabled: User['enabled'],
  ) {}

  public static fromJson(obj: UserAuthEntity): UserAuthEntity {
    const { id, type, username, tag, root, enabled } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new UserAuthEntity(id, type, username, tag, root, enabled);
  }
}
