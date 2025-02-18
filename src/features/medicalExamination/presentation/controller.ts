import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateMedicalExamination,
  CreateMedicalExaminationDto,
  DeleteMedicalExamination,
  GetMedicalExaminationById,
  GetMedicalExaminationByIdDto,
  GetMedicalExaminations,
  type MedicalExaminationEntity,
  type MedicalExaminationRepository,
  UpdateMedicalExamination,
  UpdateMedicalExaminationDto,
  type MedicalExaminationGetAllResponseEntity,
  type MedicalExaminationGetByIdResponseEntity,
  type MedicalExaminationCreateResponseEntity,
  type MedicalExaminationUpdateResponseEntity,
  type MedicalExaminationDeleteResponseEntity,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { parseISOStringToDate } from '../../../core/helpers';
import { type TypeExam } from '@prisma/client';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<MedicalExaminationEntity, 'id'>>> {
  type: TypeExam;
  type2: TypeExam[];
}

interface RequestQuery {
  page: string;
  limit: string;
}

export class MedicalExaminationController {
  //* Dependency injection
  constructor(private readonly medicalExaminationRepository: MedicalExaminationRepository) {}

  public getAllMedicalExaminations = (
    req: Request<unknown, unknown, RequestBody, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<MedicalExaminationGetAllResponseEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10 } = req.query;
    const { type2 } = req.body;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit });
    console.log(req.body)
    console.log(JSON.parse(type2), type2)
    new GetMedicalExaminations(this.medicalExaminationRepository)
      .execute(paginationDto, JSON.parse(type2))
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getMedicalExaminationById = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalExaminationGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalExaminationByIdDto = GetMedicalExaminationByIdDto.create({ id });

    new GetMedicalExaminationById(this.medicalExaminationRepository)
      .execute(getMedicalExaminationByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createMedicalExamination = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalExaminationCreateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const {
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt,
    } = req.body;

    const createMedicalExaminationDto = CreateMedicalExaminationDto.create({
      dateExam: parseISOStringToDate(dateExam),
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
      createdAt: parseISOStringToDate(createdAt),
    });

    new CreateMedicalExamination(this.medicalExaminationRepository)
      .execute(createMedicalExaminationDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public updateMedicalExamination = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<MedicalExaminationUpdateResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const {
      dateExam,
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    } = req.body;

    const updateMedicalExaminationDto = UpdateMedicalExaminationDto.create({
      id,
      dateExam: parseISOStringToDate(dateExam),
      observation,
      anexes,
      conclusion,
      titleDimension,
      nameDimension,
      measureDimension,
      descriptionDimension,
      medicalPatientId,
      doctorId,
      medicalExaminationTypeId,
    });

    new UpdateMedicalExamination(this.medicalExaminationRepository)
      .execute(updateMedicalExaminationDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public deleteMedicalExamination = (
    req: Request<Params>,
    res: Response<SuccessResponse<MedicalExaminationDeleteResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getMedicalExaminationByIdDto = GetMedicalExaminationByIdDto.create({ id });

    new DeleteMedicalExamination(this.medicalExaminationRepository)
      .execute(getMedicalExaminationByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
