import { type ProcessYearEntity } from '../entities';

export abstract class ProcessYearDatasource {
  abstract getAll(): Promise<ProcessYearEntity[]>;
}
