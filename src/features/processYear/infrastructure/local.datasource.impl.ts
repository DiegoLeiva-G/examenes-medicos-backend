import { type ProcessYearDatasource, type ProcessYearEntity } from '../domain';
import { caschileDB } from '../../../core/mssqlClient';

export class ProcessYearDatasourceImpl implements ProcessYearDatasource {
  public async getAll(): Promise<ProcessYearEntity[]> {
    const processYears = await caschileDB<{ Ano_Proceso: number }>(
      'select Ano_Proceso from Guberna.dbo.Ano_Proceso GROUP BY Ano_Proceso ORDER BY Ano_Proceso DESC',
    );

    return processYears.recordset;
  }
}
