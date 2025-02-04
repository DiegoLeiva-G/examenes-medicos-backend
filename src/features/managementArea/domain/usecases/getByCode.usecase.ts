import { type GetManagementAreaByCodeDto } from '../dtos';
import { type ManagementAreaEntity } from '../entities';
import { type ManagementAreaRepository } from '../repositories';

export interface GetManagementAreaByCodeUseCase {
  execute: (getByCodeDto: GetManagementAreaByCodeDto) => Promise<ManagementAreaEntity>;
}

export class GetManagementAreaByCode implements GetManagementAreaByCodeUseCase {
  constructor(private readonly repository: ManagementAreaRepository) {}

  async execute(getByCodeDto: GetManagementAreaByCodeDto): Promise<ManagementAreaEntity> {
    return await this.repository.getByCode(getByCodeDto);
  }
}
