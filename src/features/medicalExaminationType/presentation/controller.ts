import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateMedicalExaminationType,
  CreateMedicalExaminationTypeDto,
  DeleteMedicalExaminationType,
  GetMedicalExaminationTypeById,
  GetMedicalExaminationTypeByIdDto,
  GetMedicalExaminationTypes,
  type MedicalExaminationTypeEntity,
  type MedicalExaminationTypeRepository,
  UpdateMedicalExaminationType,
  UpdateMedicalExaminationTypeDto,
  type MedicalExaminationTypeGetAllResponseEntity,
  type MedicalExaminationTypeGetByIdResponseEntity,
  type MedicalExaminationTypeCreateResponseEntity,
  type MedicalExaminationTypeUpdateResponseEntity,
  type MedicalExaminationTypeDeleteResponseEntity,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { type TypeExam } from '@prisma/client';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<MedicalExaminationTypeEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class MedicalExaminationTypeController {
  //* Dependency injection
  constructor(private readonly medicalExaminationTypeRepository: MedicalExaminationTypeRepository) {}

  public getAllMedicalExaminationTypes = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<MedicalExaminationTypeGetAllResponseEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetMedicalExaminationTypes(this.medicalExaminationTypeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getMedicalExaminationTypeById = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalExaminationTypeGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalExaminationTypeByIdDto = GetMedicalExaminationTypeByIdDto.create({ id });

    new GetMedicalExaminationTypeById(this.medicalExaminationTypeRepository)
      .execute(getMedicalExaminationTypeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createMedicalExaminationType = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalExaminationTypeCreateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { name, type } = req.body;

    const createMedicalExaminationTypeDto = CreateMedicalExaminationTypeDto.create({
      name,
      type: type as TypeExam,
    });

    new CreateMedicalExaminationType(this.medicalExaminationTypeRepository)
      .execute(createMedicalExaminationTypeDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateMedicalExaminationType = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalExaminationTypeUpdateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, type } = req.body;

    const updateMedicalExaminationTypeDto = UpdateMedicalExaminationTypeDto.create({
      id,
      name,
      type: type as TypeExam,
    });

    new UpdateMedicalExaminationType(this.medicalExaminationTypeRepository)
      .execute(updateMedicalExaminationTypeDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public deleteMedicalExaminationType = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalExaminationTypeDeleteResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalExaminationTypeByIdDto = GetMedicalExaminationTypeByIdDto.create({ id });

    new DeleteMedicalExaminationType(this.medicalExaminationTypeRepository)
      .execute(getMedicalExaminationTypeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
