import { type DoctorGetAllResponseEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type DoctorRepository } from '../repositories';

export interface GetDoctorsUseCase {
  execute: (pagination: PaginationDto) => Promise<PaginationResponseEntity<DoctorGetAllResponseEntity[]>>;
}

export class GetDoctors implements GetDoctorsUseCase {
  constructor(private readonly repository: DoctorRepository) {}

  async execute(pagination: PaginationDto): Promise<PaginationResponseEntity<DoctorGetAllResponseEntity[]>> {
    return await this.repository.getAllDoctors(pagination);
  }
}
