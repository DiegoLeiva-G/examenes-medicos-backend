import { type ProcessYearDatasource, type ProcessYearEntity, type ProcessYearRepository } from '../domain';

export class ProcessYearRepositoryImpl implements ProcessYearRepository {
  constructor(private readonly datasource: ProcessYearDatasource) {}

  async getAll(): Promise<ProcessYearEntity[]> {
    return await this.datasource.getAll();
  }
}
