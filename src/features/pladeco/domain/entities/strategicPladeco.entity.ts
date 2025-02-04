import { AppError } from '../../../../core';
import { type StrategicPladeco } from '@prisma/client';
import { type SpecificPladecoEntity } from './specificPladeco.entity';

interface IStrategicPladecoExtended extends StrategicPladeco {
  pladeco?: unknown;
  specificPladeco?: SpecificPladecoEntity[];
  strategicPladecoByDirectorate?: unknown;
}

export class StrategicPladecoEntity implements IStrategicPladecoExtended {
  constructor(
    public id: StrategicPladeco['id'],
    public correlative: StrategicPladeco['correlative'],
    public strategicLine: StrategicPladeco['strategicLine'],
    public strategicObjective: StrategicPladeco['strategicObjective'],
    public pladecoId: StrategicPladeco['pladecoId'],
    public enabled: StrategicPladeco['enabled'],
    public archived: StrategicPladeco['archived'],
    public createdAt: StrategicPladeco['createdAt'],
    public updatedAt: StrategicPladeco['updatedAt'],
  ) {}

  public static fromJson(obj: StrategicPladecoEntity): StrategicPladecoEntity {
    const { id, correlative, strategicLine, strategicObjective, pladecoId, enabled, archived, createdAt, updatedAt } =
      obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new StrategicPladecoEntity(
      id,
      correlative,
      strategicLine,
      strategicObjective,
      pladecoId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class StrategicPladecoToListEntity
  implements Pick<StrategicPladecoEntity, 'id' | 'correlative' | 'strategicLine' | 'strategicObjective'>
{
  constructor(
    public id: StrategicPladeco['id'],
    public correlative: StrategicPladeco['correlative'],
    public strategicLine: StrategicPladeco['strategicLine'],
    public strategicObjective: StrategicPladeco['strategicObjective'],
  ) {}

  public static fromJson(obj: StrategicPladecoToListEntity): StrategicPladecoToListEntity {
    const { id, correlative, strategicLine, strategicObjective } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new StrategicPladecoToListEntity(id, correlative, strategicLine, strategicObjective);
  }
}
