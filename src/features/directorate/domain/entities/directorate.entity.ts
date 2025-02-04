import { AppError } from '../../../../core';
import { type DepartmentSummaryEntity } from '../../../department';

export class DirectorateEntity {
  constructor(
    // eslint-disable-next-line camelcase
    public Codigo_Direccion: number,
    public DESCRIPCION: string,
    public department?: DepartmentSummaryEntity[] | null,
  ) {}

  public static fromJson(obj: DirectorateEntity): DirectorateEntity {
    // eslint-disable-next-line
    const { Codigo_Direccion, DESCRIPCION, department } = obj;

    // eslint-disable-next-line
    if (!Codigo_Direccion) {
      throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', field: 'id' }]);
    }

    return new DirectorateEntity(Codigo_Direccion, DESCRIPCION, department);
  }
}
