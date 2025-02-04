import { AppError } from '../../../../core';

export class ManagementAreaEntity {
  constructor(
    // eslint-disable-next-line
    public Codigo_AreaGestion: number,
    // eslint-disable-next-line
    public Descripcion_AreaGestion: string,
  ) {}

  public static fromJson(obj: ManagementAreaEntity): ManagementAreaEntity {
    // eslint-disable-next-line
    const { Codigo_AreaGestion, Descripcion_AreaGestion } = obj;

    // eslint-disable-next-line
    if (!Codigo_AreaGestion) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    // eslint-disable-next-line
    if (!Descripcion_AreaGestion || Descripcion_AreaGestion.length === 0) {
      throw AppError.badRequest('This entity requires a description', [
        { constraint: 'Descripcion_AreaGestion is required', field: 'Descripcion_AreaGestion' },
      ]);
    }

    return new ManagementAreaEntity(Codigo_AreaGestion, Descripcion_AreaGestion);
  }
}
