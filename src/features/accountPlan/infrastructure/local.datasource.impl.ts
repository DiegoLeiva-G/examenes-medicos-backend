import {
  type AccountPlanDatasource,
  AccountPlanEntity,
  type AccountPlanPaginationDto,
  type PaginationAccountPlanResponseEntity,
} from '../domain';
import { caschileDB } from '../../../core/mssqlClient';

export class AccountPlanDatasourceImpl implements AccountPlanDatasource {
  public async getAll(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    const { page, search, limit, year } = pagination;

    const queryCount =
      'SELECT COUNT(pi.CodigoCuenta) AS total from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryData =
      'select pi.CodigoCuenta, pdc.Descripcion, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryPagination = `ORDER BY pi.CodigoCuenta OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const totalAmountsQuery =
      'SELECT pi.CodigoCuenta, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta ' +
      `where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}`;

    const totalAmountsData = await caschileDB<AccountPlanEntity>(totalAmountsQuery);

    const totalAmounts = totalAmountsData.recordset.reduce(
      (acc, accountPlan) => {
        if (accountPlan.CodigoCuenta.startsWith('115-')) {
          return { ...acc, totalIncomes: acc.totalIncomes + accountPlan.PresupuestoInicial };
        }

        if (accountPlan.CodigoCuenta.startsWith('215-')) {
          return { ...acc, totalExpenses: acc.totalExpenses + accountPlan.PresupuestoInicial };
        }

        return acc;
      },
      { totalExpenses: 0, totalIncomes: 0 },
    );

    const searchWhere = !search ? '' : `and (pdc.Descripcion LIKE '%${search}%' OR pi.CodigoCuenta LIKE '%${search}%')`;

    const countAccountPlan = await caschileDB<{ total: number }>(
      `${queryCount} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year} ${searchWhere}`,
    );

    const accountsPlan = await caschileDB<AccountPlanEntity>(
      `${queryData} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}` +
        ` ${searchWhere} ${queryPagination}`,
    );

    const totalItems = countAccountPlan.recordset[0]?.total || 0;

    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: accountsPlan.recordset.map(accountPlan => AccountPlanEntity.fromJson(accountPlan)),
      totalAmounts,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getIncomes(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    const { page, search, limit, year } = pagination;

    const queryCount =
      'SELECT COUNT(pi.CodigoCuenta) AS total from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryData =
      'select pi.CodigoCuenta, pdc.Descripcion, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryPagination = `ORDER BY pi.CodigoCuenta OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const totalAmountsQuery =
      'SELECT pi.CodigoCuenta, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta ' +
      `where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}`;

    const totalAmountsData = await caschileDB<AccountPlanEntity>(totalAmountsQuery);

    const totalAmounts = totalAmountsData.recordset.reduce(
      (acc, accountPlan) => {
        if (accountPlan.CodigoCuenta.startsWith('115-')) {
          return { ...acc, totalIncomes: acc.totalIncomes + accountPlan.PresupuestoInicial };
        }

        if (accountPlan.CodigoCuenta.startsWith('215-')) {
          return { ...acc, totalExpenses: acc.totalExpenses + accountPlan.PresupuestoInicial };
        }

        return acc;
      },
      { totalExpenses: 0, totalIncomes: 0 },
    );

    const searchWhere = !search ? '' : `and (pdc.Descripcion LIKE '%${search}%' OR pi.CodigoCuenta LIKE '%${search}%')`;

    const countAccountPlan = await caschileDB<{ total: number }>(
      `${queryCount} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year} and pi.CodigoCuenta LIKE '%115%' ${searchWhere}`,
    );

    const accountsPlan = await caschileDB<AccountPlanEntity>(
      `${queryData} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}` +
        ` and pi.CodigoCuenta LIKE '%115%' ${searchWhere} ${queryPagination}`,
    );

    const totalItems = countAccountPlan.recordset[0]?.total || 0;

    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: accountsPlan.recordset.map(accountPlan => AccountPlanEntity.fromJson(accountPlan)),
      totalAmounts,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }

  public async getExpenses(
    pagination: AccountPlanPaginationDto,
  ): Promise<PaginationAccountPlanResponseEntity<AccountPlanEntity[]>> {
    const { page, search, limit, year } = pagination;

    const queryCount =
      'SELECT COUNT(pi.CodigoCuenta) AS total from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryData =
      'select pi.CodigoCuenta, pdc.Descripcion, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta';

    const queryPagination = `ORDER BY pi.CodigoCuenta OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    const totalAmountsQuery =
      'SELECT pi.CodigoCuenta, pi.PresupuestoInicial from Guberna.dbo.PresupuestoInicial pi ' +
      'inner join Guberna.dbo.PlanDeCuentas pdc on pdc.CodigoCuenta = pi.CodigoCuenta ' +
      `where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}`;

    const totalAmountsData = await caschileDB<AccountPlanEntity>(totalAmountsQuery);

    const totalAmounts = totalAmountsData.recordset.reduce(
      (acc, accountPlan) => {
        if (accountPlan.CodigoCuenta.startsWith('115-')) {
          return { ...acc, totalIncomes: acc.totalIncomes + accountPlan.PresupuestoInicial };
        }

        if (accountPlan.CodigoCuenta.startsWith('215-')) {
          return { ...acc, totalExpenses: acc.totalExpenses + accountPlan.PresupuestoInicial };
        }

        return acc;
      },
      { totalExpenses: 0, totalIncomes: 0 },
    );

    const searchWhere = !search ? '' : `and (pdc.Descripcion LIKE '%${search}%' OR pi.CodigoCuenta LIKE '%${search}%')`;

    const countAccountPlan = await caschileDB<{ total: number }>(
      `${queryCount} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year} and pi.CodigoCuenta LIKE '%215%' ${searchWhere}`,
    );

    const accountsPlan = await caschileDB<AccountPlanEntity>(
      `${queryData} where pi.Ano_Proceso = ${year} and pdc.Ano_Proceso = ${year}` +
        ` and pi.CodigoCuenta LIKE '%215%' ${searchWhere} ${queryPagination}`,
    );

    const totalItems = countAccountPlan.recordset[0]?.total || 0;

    const totalPages = Math.ceil(totalItems / limit);

    return {
      results: accountsPlan.recordset.map(accountPlan => AccountPlanEntity.fromJson(accountPlan)),
      totalAmounts,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total: totalItems,
      totalPages,
    };
  }
}
