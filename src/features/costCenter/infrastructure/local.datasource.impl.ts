import { type CostCenterDatasource, CostCenterEntity } from '../domain';
import { caschileDB } from '../../../core/mssqlClient';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import { type ManagementAreaEntity } from '../../managementArea';
import { type DirectorateEntity } from '../../directorate';

export class CostCenterDatasourceImpl implements CostCenterDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    const { page, search, limit } = pagination;
    const baseQuery = 'FROM Comun.dbo.Centro_Costo';
    const searchCondition = search
      ? ` WHERE Descripcion LIKE '%${search}%' OR Codigo_Centro_Costo LIKE '%${search}%''`
      : '';
    const queryPagination = `ORDER BY Codigo_Centro_Costo OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    const queryCount = `SELECT COUNT(Codigo_Centro_Costo) AS total ${baseQuery}${searchCondition}`;
    const queryData = `SELECT Codigo_Centro_Costo, Descripcion, Codigo_Area_Gestion ${baseQuery}${searchCondition} ${queryPagination}`;

    const [countCostCenters, costCenters] = await Promise.all([
      caschileDB<{ total: number }>(queryCount),
      caschileDB<CostCenterEntity>(queryData),
    ]);

    const totalItems = countCostCenters.recordset[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: costCenters.recordset.map(costCenter => CostCenterEntity.fromJson(costCenter)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getAllByManagementAreaAndDirectorate(
    managementAreaCode: ManagementAreaEntity['Codigo_AreaGestion'],
    directorateCode: DirectorateEntity['Codigo_Direccion'],
  ): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    const queryData = `SELECT Codigo_Centro_Costo, Descripcion FROM Comun.dbo.Centro_Costo WHERE Codigo_Area = 1 AND Codigo_Area_Gestion = ${managementAreaCode} AND Codigo_Direccion = ${directorateCode} ORDER BY Descripcion`;

    const costCenters = await caschileDB<CostCenterEntity>(queryData);

    const totalItems = costCenters.recordset.length;
    const totalPages = 1;

    return {
      results: costCenters.recordset.map(costCenter => CostCenterEntity.fromJson(costCenter)),
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      total: totalItems,
      totalPages,
    };
  }
}
