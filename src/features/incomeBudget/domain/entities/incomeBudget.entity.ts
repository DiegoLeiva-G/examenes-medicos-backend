import { type IncomeBudget } from '@prisma/client';
import { AppError } from '../../../../core';

interface IIncomeBudgetExtended extends IncomeBudget {}

export class IncomeBudgetEntity implements IIncomeBudgetExtended {
  constructor(
    public id: IncomeBudget['id'],
    public year: IncomeBudget['year'],
    public managementAreaReferenceCode: IncomeBudget['managementAreaReferenceCode'],
    public archived: IncomeBudget['archived'],
    public createdAt: IncomeBudget['createdAt'],
    public updatedAt: IncomeBudget['updatedAt'],
  ) {}

  public static fromJson(obj: IncomeBudgetEntity): IncomeBudgetEntity {
    const { id, year, managementAreaReferenceCode, archived, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new IncomeBudgetEntity(id, year, managementAreaReferenceCode, archived, createdAt, updatedAt);
  }
}

export class IncomeBudgetSummaryEntity implements Pick<IncomeBudgetEntity, 'id' | 'year'> {
  constructor(
    public id: IncomeBudget['id'],
    public year: IncomeBudget['year'],
    public incomeBudgetTotal: number,
  ) {}

  public static fromJson(obj: IncomeBudgetSummaryEntity): IncomeBudgetSummaryEntity {
    const { id, year, incomeBudgetTotal } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new IncomeBudgetSummaryEntity(id, year, incomeBudgetTotal);
  }
}
