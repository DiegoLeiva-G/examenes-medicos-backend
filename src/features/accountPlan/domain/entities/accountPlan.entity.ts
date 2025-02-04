import { AppError } from '../../../../core';

export class AccountPlanEntity {
  constructor(
    public CodigoCuenta: string,
    public Descripcion: string,
    public PresupuestoInicial: number,
  ) {}

  public static fromJson(obj: AccountPlanEntity): AccountPlanEntity {
    const { CodigoCuenta, Descripcion, PresupuestoInicial } = obj;

    if (!CodigoCuenta) {
      throw AppError.badRequest('This entity requires an account code', [
        { constraint: 'account code is required', field: 'CodigoCuenta' },
      ]);
    }

    if (!Descripcion || Descripcion.length === 0) {
      throw AppError.badRequest('This entity requires a description', [
        { constraint: 'description is required', field: 'Descripcion' },
      ]);
    }

    return new AccountPlanEntity(CodigoCuenta, Descripcion, PresupuestoInicial);
  }
}
