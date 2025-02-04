import { type ManagementAreaEntity } from '../entities';
import { type ManagementAreaRepository } from '../repositories';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export interface GetManagementAreasUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<ManagementAreaEntity[]>>;
}

export class GetManagementAreas implements GetManagementAreasUseCase {
  constructor(private readonly repository: ManagementAreaRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<ManagementAreaEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
