import { type GetStateByIdDto } from '../dtos';
import { type StateEntity } from '../entities';
import { type LocationRepository } from '../repositories';

export interface GetStateByIdUseCase {
  execute: (getByIdDto: GetStateByIdDto) => Promise<StateEntity>;
}

export class GetStateById implements GetStateByIdUseCase {
  constructor(private readonly repository: LocationRepository) {}

  async execute(getByIdDto: GetStateByIdDto): Promise<StateEntity> {
    return await this.repository.getStateById(getByIdDto);
  }
}
