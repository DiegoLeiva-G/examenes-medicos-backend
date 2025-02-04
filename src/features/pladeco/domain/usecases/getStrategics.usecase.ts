import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type StrategicPladecoToListEntity } from '../entities';
import { type PladecoRepository } from '../repositories';

export interface GetStrategicsPladecoUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<StrategicPladecoToListEntity[]>>;
}

export class GetStrategicsPladeco implements GetStrategicsPladecoUseCase {
  constructor(private readonly repository: PladecoRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<StrategicPladecoToListEntity[]>> {
    return await this.repository.getStrategics(pagination);
  }
}
