import { caschileDB } from '../../../core/mssqlClient';
import prisma from '../../../core/dbClient';
import { type DirectorateDatasource, DirectorateEntity, type GetDirectorateByCodeDto } from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class DirectorateDatasourceImpl implements DirectorateDatasource {
  public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>> {
    const { page, search, limit } = pagination;
    const baseQuery = 'FROM Comun.dbo.Direcciones';
    const searchCondition = search
      ? ` WHERE Codigo_Area = 1 AND DESCRIPCION LIKE '%${search}%' OR Codigo_Direccion LIKE '%${search}%'`
      : ' WHERE Codigo_Area = 1';
    const queryPagination = `ORDER BY Codigo_Direccion OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    const queryCount = `SELECT COUNT(Codigo_Direccion) AS total ${baseQuery}${searchCondition}`;
    const queryData = `SELECT Codigo_Direccion, DESCRIPCION ${baseQuery}${searchCondition} ${queryPagination}`;

    const [countDirectorates, directorates] = await Promise.all([
      caschileDB<{ total: number }>(queryCount),
      caschileDB<DirectorateEntity>(queryData),
    ]);

    const totalItems = countDirectorates.recordset[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: directorates.recordset.map(directorate => DirectorateEntity.fromJson(directorate)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getAllWithDepartments(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<DirectorateEntity[]>> {
    const { page, search, limit } = pagination;
    const baseQuery = 'FROM Comun.dbo.Direcciones';
    const searchCondition = search
      ? ` WHERE Codigo_Area = 1 AND DESCRIPCION LIKE '%${search}%' OR Codigo_Direccion LIKE '%${search}%'`
      : ' WHERE Codigo_Area = 1';
    const queryPagination = `ORDER BY Codigo_Direccion OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    const queryCount = `SELECT COUNT(Codigo_Direccion) AS total ${baseQuery}${searchCondition}`;
    const queryData = `SELECT Codigo_Direccion, DESCRIPCION ${baseQuery}${searchCondition} ${queryPagination}`;

    const [countDirectorates, directorates] = await Promise.all([
      caschileDB<{ total: number }>(queryCount),
      caschileDB<DirectorateEntity>(queryData),
    ]);

    const totalItems = countDirectorates.recordset[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        directorateCodeReference: true,
        description: true,
        subDepartmentId: true,
        enabled: true,
      },
      where: {
        archived: false,
      },
    });

    // TODO: add sort to departments
    const directorateByDepartment = directorates.recordset.map(directorate => {
      const department = departments.filter(
        department => department.directorateCodeReference === directorate.Codigo_Direccion,
      );

      return {
        ...directorate,
        department,
      };
    });

    return {
      results: directorateByDepartment.map(directorate => DirectorateEntity.fromJson(directorate)),
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getByCode(getByCode: GetDirectorateByCodeDto): Promise<DirectorateEntity> {
    // eslint-disable-next-line
    const { Codigo_Direccion } = getByCode.data;

    // eslint-disable-next-line
    const queryData = `SELECT Codigo_Direccion, DESCRIPCION FROM Comun.dbo.Direcciones WHERE Codigo_Area = 1 AND Codigo_Direccion = ${Codigo_Direccion} ORDER BY Codigo_Direccion`;

    const directorates = await caschileDB<DirectorateEntity>(queryData);

    return DirectorateEntity.fromJson(directorates.recordset[0]);
  }
}
