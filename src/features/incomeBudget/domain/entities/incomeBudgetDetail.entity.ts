import { type IncomeBudgetDetail } from '@prisma/client';
import { AppError } from '../../../../core';

interface IIncomeBudgetDetailExtended extends IncomeBudgetDetail {}

export class IncomeBudgetDetailEntity implements IIncomeBudgetDetailExtended {
  constructor(
    public id: IncomeBudgetDetail['id'],
    public accountCode: IncomeBudgetDetail['accountCode'],
    public accountName: IncomeBudgetDetail['accountName'],
    public amount: IncomeBudgetDetail['amount'],
    public incomeBudgetId: IncomeBudgetDetail['incomeBudgetId'],
    public archived: IncomeBudgetDetail['archived'],
    public createdAt: IncomeBudgetDetail['createdAt'],
    public updatedAt: IncomeBudgetDetail['updatedAt'],
  ) {}

  public static fromJson(obj: IncomeBudgetDetailEntity): IncomeBudgetDetailEntity {
    const { id, accountCode, accountName, amount, incomeBudgetId, archived, createdAt, updatedAt } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new IncomeBudgetDetailEntity(
      id,
      accountCode,
      accountName,
      amount,
      incomeBudgetId,
      archived,
      createdAt,
      updatedAt,
    );
  }
}

export class IncomeBudgetDetailSummaryEntity
  implements Pick<IncomeBudgetDetailEntity, 'id' | 'accountCode' | 'accountName'>
{
  constructor(
    public id: IncomeBudgetDetail['id'],
    public accountCode: IncomeBudgetDetail['accountCode'],
    public accountName: IncomeBudgetDetail['accountName'],
    public amount: number,
  ) {}

  public static fromJson(obj: IncomeBudgetDetailSummaryEntity): IncomeBudgetDetailSummaryEntity {
    const { id, accountCode, accountName, amount } = obj;

    if (!id) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new IncomeBudgetDetailSummaryEntity(id, accountCode, accountName, amount);
  }
}
