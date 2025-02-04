import { type MeasureUnit } from '@prisma/client';
import { AppError } from '../../../../core';

interface IMeasureUnitExtended extends MeasureUnit {}

export class MeasureUnitEntity implements IMeasureUnitExtended {
  constructor(
    public id: MeasureUnit['id'],
    public name: MeasureUnit['name'],
    public enabled: MeasureUnit['enabled'],
    public archived: MeasureUnit['archived'],
    public createdAt: MeasureUnit['createdAt'],
    public updatedAt: MeasureUnit['updatedAt'],
  ) {}

  public static fromJson(obj: MeasureUnitEntity): MeasureUnitEntity {
    const { id, name, enabled, archived, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MeasureUnitEntity(id, name, enabled, archived, createdAt, updatedAt);
  }
}

export class MeasureUnitSummaryEntity implements Pick<MeasureUnitEntity, 'id' | 'name' | 'enabled'> {
  constructor(
    public id: MeasureUnit['id'],
    public name: MeasureUnit['name'],
    public enabled: MeasureUnit['enabled'],
  ) {}

  public static fromJson(obj: MeasureUnitSummaryEntity): MeasureUnitSummaryEntity {
    const { id, name, enabled } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new MeasureUnitSummaryEntity(id, name, enabled);
  }
}
