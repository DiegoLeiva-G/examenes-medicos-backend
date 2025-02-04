import { type GetManagementAreaByCodeDto, type ManagementAreaDatasource, ManagementAreaEntity } from '../domain';
import { caschileDB } from '../../../core/mssqlClient';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class ManagementAreaDatasourceImpl implements ManagementAreaDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<ManagementAreaEntity[]>> {
    const { page, limit, search } = pagination;
    const baseQuery = `FROM Guberna.dbo.AreadeGestion WHERE Ano_Proceso = ${new Date().getFullYear() - 1}`;
    const searchCondition = search
      ? ` AND (Codigo_AreaGestion LIKE '%${search}%' OR Descripcion_AreaGestion LIKE '%${search}%')`
      : '';
    const queryPagination = `ORDER BY Codigo_AreaGestion OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    const queryCount = `SELECT COUNT(Codigo_AreaGestion) AS total ${baseQuery}${searchCondition}`;
    const queryData = `SELECT Codigo_AreaGestion, Descripcion_AreaGestion ${baseQuery}${searchCondition} ${queryPagination}`;

    const [countManagementAreas, managementAreas] = await Promise.all([
      caschileDB<{ total: number }>(queryCount),
      caschileDB<ManagementAreaEntity>(queryData),
    ]);

    const totalItems = countManagementAreas.recordset[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: managementAreas.recordset.map(managementArea => ManagementAreaEntity.fromJson(managementArea)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getByCode(getByCode: GetManagementAreaByCodeDto): Promise<ManagementAreaEntity> {
    // eslint-disable-next-line
    const { Codigo_AreaGestion } = getByCode.data;
    // eslint-disable-next-line
    const queryData = `SELECT Codigo_AreaGestion, Descripcion_AreaGestion FROM Guberna.dbo.AreadeGestion WHERE Ano_Proceso = ${new Date().getFullYear() - 1} AND Codigo_AreaGestion = ${Codigo_AreaGestion} ORDER BY Codigo_AreaGestion`;

    const managementAreas = await caschileDB<ManagementAreaEntity>(queryData);

    return ManagementAreaEntity.fromJson(managementAreas.recordset[0]);
  }
}
