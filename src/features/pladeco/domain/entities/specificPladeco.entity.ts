import { AppError } from '../../../../core';
import { type SpecificPladeco } from '@prisma/client';
import { type StrategicPladecoEntity, type StrategicPladecoToListEntity } from './strategicPladeco.entity';

interface ISpecificPladecoExtended extends SpecificPladeco {
  strategicPladeco?: StrategicPladecoEntity;
  investmentInitiative?: unknown[];
  improvementProject?: unknown[];
}

export class SpecificPladecoEntity implements ISpecificPladecoExtended {
  constructor(
    public id: SpecificPladeco['id'],
    public correlative: SpecificPladeco['correlative'],
    public specificLine: SpecificPladeco['specificLine'],
    public specificObjective: SpecificPladeco['specificObjective'],
    public strategicPladecoId: SpecificPladeco['strategicPladecoId'],
    public enabled: SpecificPladeco['enabled'],
    public archived: SpecificPladeco['archived'],
    public createdAt: SpecificPladeco['createdAt'],
    public updatedAt: SpecificPladeco['updatedAt'],
    public strategicPladeco?: StrategicPladecoEntity,
  ) {}

  public static fromJson(obj: SpecificPladecoEntity): SpecificPladecoEntity {
    const {
      id,
      correlative,
      specificLine,
      specificObjective,
      strategicPladecoId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new SpecificPladecoEntity(
      id,
      correlative,
      specificLine,
      specificObjective,
      strategicPladecoId,
      enabled,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class SpecificPladecoToListEntity
  implements Pick<SpecificPladecoEntity, 'id' | 'correlative' | 'specificLine' | 'specificObjective'>
{
  constructor(
    public id: SpecificPladeco['id'],
    public correlative: SpecificPladeco['correlative'],
    public specificLine: SpecificPladeco['specificLine'],
    public specificObjective: SpecificPladeco['specificObjective'],
    public strategicPladeco: StrategicPladecoToListEntity,
  ) {}

  public static fromJson(obj: SpecificPladecoToListEntity): SpecificPladecoToListEntity {
    const { id, correlative, specificLine, specificObjective, strategicPladeco } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new SpecificPladecoToListEntity(id, correlative, specificLine, specificObjective, strategicPladeco);
  }
}
