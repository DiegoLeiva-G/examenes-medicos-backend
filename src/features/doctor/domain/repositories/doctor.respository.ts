import {
  type DoctorCreateResponseEntity,
  type DoctorDeleteResponseEntity,
  type DoctorGetAllResponseEntity,
  type DoctorGetByIdResponseEntity,
  type DoctorUpdateResponseEntity,
} from '../entities';
import type { PaginationDto, PaginationResponseEntity } from '../../../_global';
import { type CreateDoctorDto, type GetDoctorByIdDto, type UpdateDoctorDto } from '../dtos';

export abstract class DoctorRepository {
  abstract getAllDoctors(pagination: PaginationDto): Promise<PaginationResponseEntity<DoctorGetAllResponseEntity[]>>;
  abstract getDoctorById(getByIdDto: GetDoctorByIdDto): Promise<DoctorGetByIdResponseEntity>;
  abstract deleteDoctor(getByIdDto: GetDoctorByIdDto): Promise<DoctorDeleteResponseEntity>;
  abstract createDoctor(createDto: CreateDoctorDto): Promise<DoctorCreateResponseEntity>;
  abstract updateDoctor(updateDto: UpdateDoctorDto): Promise<DoctorUpdateResponseEntity>;
}
