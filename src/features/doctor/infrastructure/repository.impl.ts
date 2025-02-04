import {
  type CreateDoctorDto,
  type DoctorCreateResponseEntity,
  type DoctorDatasource,
  type DoctorDeleteResponseEntity,
  type DoctorGetAllResponseEntity,
  type DoctorGetByIdResponseEntity,
  type DoctorRepository,
  type DoctorUpdateResponseEntity,
  type GetDoctorByIdDto,
  type UpdateDoctorDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class DoctorRepositoryImpl implements DoctorRepository {
  constructor(private readonly datasource: DoctorDatasource) {}

  async getAllDoctors(pagination: PaginationDto): Promise<PaginationResponseEntity<DoctorGetAllResponseEntity[]>> {
    return await this.datasource.getAllDoctors(pagination);
  }

  async getDoctorById(getByIdDto: GetDoctorByIdDto): Promise<DoctorGetByIdResponseEntity> {
    return await this.datasource.getDoctorById(getByIdDto);
  }

  async deleteDoctor(getByIdDto: GetDoctorByIdDto): Promise<DoctorDeleteResponseEntity> {
    return await this.datasource.deleteDoctor(getByIdDto);
  }

  async createDoctor(createDto: CreateDoctorDto): Promise<DoctorCreateResponseEntity> {
    return await this.datasource.createDoctor(createDto);
  }

  async updateDoctor(updateDto: UpdateDoctorDto): Promise<DoctorUpdateResponseEntity> {
    return await this.datasource.updateDoctor(updateDto);
  }
}
