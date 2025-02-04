import { type CostCenterEntity } from '../entities';
import { type CostCenterRepository } from '../repositories';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export interface GetCostCentersUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<CostCenterEntity[]>>;
}

export class GetCostCenters implements GetCostCentersUseCase {
  constructor(private readonly repository: CostCenterRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    return await this.repository.getAll(pagination);
  }
}
