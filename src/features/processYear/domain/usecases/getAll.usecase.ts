import { type ProcessYearEntity } from '../entities';
import { type ProcessYearRepository } from '../repositories';

export interface GetProcessYearsUseCase {
  execute: () => Promise<ProcessYearEntity[]>;
}

export class GetProcessYears implements GetProcessYearsUseCase {
  constructor(private readonly repository: ProcessYearRepository) {}

  async execute(): Promise<ProcessYearEntity[]> {
    return await this.repository.getAll();
  }
}
