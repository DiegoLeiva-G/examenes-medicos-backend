import { AppError } from '../../../../core';

export class CostCenterEntity {
  constructor(
    // eslint-disable-next-line
    public Codigo_Centro_Costo: number,
    public Descripcion: string,
    // eslint-disable-next-line
    public Codigo_Area_Gestion?: number | null,
  ) {}

  public static fromJson(obj: CostCenterEntity): CostCenterEntity {
    // eslint-disable-next-line
    const { Codigo_Centro_Costo, Descripcion, Codigo_Area_Gestion } = obj;

    // eslint-disable-next-line
    if (!Codigo_Centro_Costo) {
      throw AppError.badRequest('This entity requires a cost center', [
        { constraint: 'cost center is required', field: 'Codigo_Centro_Costo' },
      ]);
    }

    if (!Descripcion || Descripcion.length === 0) {
      throw AppError.badRequest('This entity requires a description', [
        { constraint: 'description is required', field: 'Descripcion' },
      ]);
    }

    return new CostCenterEntity(Codigo_Centro_Costo, Descripcion, Codigo_Area_Gestion);
  }
}
