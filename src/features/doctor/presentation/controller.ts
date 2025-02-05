import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateDoctor,
  CreateDoctorDto,
  DeleteDoctor,
  GetDoctorById,
  GetDoctorByIdDto,
  GetDoctors,
  type DoctorEntity,
  type DoctorRepository,
  UpdateDoctor,
  UpdateDoctorDto,
  type DoctorGetAllResponseEntity,
  type DoctorGetByIdResponseEntity,
  type DoctorCreateResponseEntity,
  type DoctorUpdateResponseEntity,
  type DoctorDeleteResponseEntity,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseStringToStringArray } from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<DoctorEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class DoctorController {
  //* Dependency injection
  constructor(private readonly doctorRepository: DoctorRepository) {}

  public getAllDoctors = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<DoctorGetAllResponseEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetDoctors(this.doctorRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getDoctorById = (
    req: Request<Params>,
    res: Response<SuccessResponse<DoctorGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getDoctorByIdDto = GetDoctorByIdDto.create({ id });

    new GetDoctorById(this.doctorRepository)
      .execute(getDoctorByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createDoctor = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<DoctorCreateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { name, middleName, lastName, secondaryLastName, nameProfession, specialization } = req.body;

    const createDoctorDto = CreateDoctorDto.create({
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession: parseStringToStringArray(nameProfession),
      specialization: parseStringToStringArray(specialization),
    });

    new CreateDoctor(this.doctorRepository)
      .execute(createDoctorDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateDoctor = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<DoctorUpdateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, middleName, lastName, secondaryLastName, nameProfession, specialization } = req.body;

    console.log(req.body, req.params);
    const updateDoctorDto = UpdateDoctorDto.create({
      id,
      name,
      middleName,
      lastName,
      secondaryLastName,
      nameProfession: parseStringToStringArray(nameProfession),
      specialization: parseStringToStringArray(specialization),
    });

    new UpdateDoctor(this.doctorRepository)
      .execute(updateDoctorDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public deleteDoctor = (
    req: Request<Params>,
    res: Response<SuccessResponse<DoctorDeleteResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getDoctorByIdDto = GetDoctorByIdDto.create({ id });

    new DeleteDoctor(this.doctorRepository)
      .execute(getDoctorByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
