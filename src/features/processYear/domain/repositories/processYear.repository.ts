import { type ProcessYearEntity } from '../entities';

export abstract class ProcessYearRepository {
  abstract getAll(): Promise<ProcessYearEntity[]>;
}
