import { AppError } from '../../../../core';

export class ProcessYearEntity {
  // eslint-disable-next-line
  constructor(public Ano_Proceso: number) {}

  public static fromJson(obj: ProcessYearEntity): ProcessYearEntity {
    // eslint-disable-next-line
    const { Ano_Proceso } = obj;

    // eslint-disable-next-line
    if (!Ano_Proceso) {
      throw AppError.badRequest('This entity requires an process year', [
        { constraint: 'Ano_Proceso is required', field: 'Ano_Proceso' },
      ]);
    }

    return new ProcessYearEntity(Ano_Proceso);
  }
}
