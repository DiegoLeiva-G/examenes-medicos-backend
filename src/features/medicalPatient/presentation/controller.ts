import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateMedicalPatient,
  CreateMedicalPatientDto,
  DeleteMedicalPatient,
  GetMedicalPatientById,
  GetMedicalPatientByIdDto,
  GetMedicalPatients,
  type MedicalPatientEntity,
  type MedicalPatientRepository,
  UpdateMedicalPatient,
  UpdateMedicalPatientDto,
  type MedicalPatientGetAllResponseEntity,
  type MedicalPatientGetByIdResponseEntity,
  type MedicalPatientCreateResponseEntity,
  type MedicalPatientUpdateResponseEntity,
  type MedicalPatientDeleteResponseEntity,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<MedicalPatientEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class MedicalPatientController {
  //* Dependency injection
  constructor(private readonly medicalPatientRepository: MedicalPatientRepository) {}

  public getAllMedicalPatients = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<MedicalPatientGetAllResponseEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetMedicalPatients(this.medicalPatientRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getMedicalPatientById = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalPatientGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalPatientByIdDto = GetMedicalPatientByIdDto.create({ id });

    new GetMedicalPatientById(this.medicalPatientRepository)
      .execute(getMedicalPatientByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createMedicalPatient = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalPatientCreateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { rut, name, middleName, lastName, secondaryLastName } = req.body;

    const createMedicalPatientDto = CreateMedicalPatientDto.create({
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
    });

    new CreateMedicalPatient(this.medicalPatientRepository)
      .execute(createMedicalPatientDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateMedicalPatient = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalPatientUpdateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { rut, name, middleName, lastName, secondaryLastName } = req.body;

    const updateMedicalPatientDto = UpdateMedicalPatientDto.create({
      id,
      rut,
      name,
      middleName,
      lastName,
      secondaryLastName,
    });

    new UpdateMedicalPatient(this.medicalPatientRepository)
      .execute(updateMedicalPatientDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public deleteMedicalPatient = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalPatientDeleteResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalPatientByIdDto = GetMedicalPatientByIdDto.create({ id });

    new DeleteMedicalPatient(this.medicalPatientRepository)
      .execute(getMedicalPatientByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
