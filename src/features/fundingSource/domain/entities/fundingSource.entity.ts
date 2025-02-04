import { type FundingSource } from '@prisma/client';
import { AppError } from '../../../../core';

interface IFundingSourceExtended extends FundingSource {
  investmentInitiative?: unknown | null;
  improvementProject?: unknown | null;
}

export class FundingSourceEntity implements IFundingSourceExtended {
  constructor(
    public id: FundingSource['id'],
    public name: FundingSource['name'],
    public type: FundingSource['type'],
    public main: FundingSource['main'],
    public enabled: FundingSource['enabled'],
    public archived: FundingSource['archived'],
    public createdAt: FundingSource['createdAt'],
    public updatedAt: FundingSource['updatedAt'],
  ) {}

  public static fromJson(obj: FundingSourceEntity): FundingSourceEntity {
    const { id, name, type, main, enabled, archived, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new FundingSourceEntity(id, name, type, main, enabled, archived, createdAt, updatedAt);
  }
}

export class FundingSourceSummaryEntity implements Pick<FundingSourceEntity, 'id' | 'name' | 'type' | 'enabled'> {
  constructor(
    public id: FundingSource['id'],
    public name: FundingSource['name'],
    public type: FundingSource['type'],
    public enabled: FundingSource['enabled'],
  ) {}

  public static fromJson(obj: FundingSourceSummaryEntity): FundingSourceSummaryEntity {
    const { id, name, type, enabled } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new FundingSourceSummaryEntity(id, name, type, enabled);
  }
}
