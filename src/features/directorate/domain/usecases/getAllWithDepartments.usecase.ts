import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type DirectorateEntity } from '../entities';
import { type DirectorateRepository } from '../repositories';

export interface GetDirectoratesWithDepartmentsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<DirectorateEntity[]>>;
}

export class GetDirectoratesWithDepartments implements GetDirectoratesWithDepartmentsUseCase {
  constructor(private readonly repository: DirectorateRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<DirectorateEntity[]>> {
    return await this.repository.getAllWithDepartments(pagination);
  }
}
