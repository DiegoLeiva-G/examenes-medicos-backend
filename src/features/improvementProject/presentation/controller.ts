import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateImprovementProject,
  CreateImprovementProjectDto,
  DeleteImprovementProject,
  GetImprovementProjectById,
  GetImprovementProjectByIdDto,
  GetImprovementProjects,
  type ImprovementProjectEntity,
  type ImprovementProjectEntityToList,
  type ImprovementProjectRepository,
  type ImprovementProjectSummaryEntity,
  UpdateImprovementProject,
  UpdateImprovementProjectDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  parseISOStringToDate,
  parseStringBoolean,
  parseStringNumber,
  parseStringToStringArray,
} from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<ImprovementProjectEntity, 'id'>>> {
  specificPladecoIds: string;
}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class ImprovementProjectController {
  //* Dependency injection
  constructor(private readonly employeeRepository: ImprovementProjectRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<ImprovementProjectEntityToList[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetImprovementProjects(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<ImprovementProjectSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getImprovementProjectByIdDto = GetImprovementProjectByIdDto.create({ id });

    new GetImprovementProjectById(this.employeeRepository)
      .execute(getImprovementProjectByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  // TODO: validate directorate codes, funding sources and specifics pladeco
  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<ImprovementProjectEntity>>,
    next: NextFunction,
  ): void => {
    const { name, directorateResponsibleCodeReference, specificPladecoIds, startDate, endDate, legalNorms, enabled } =
      req.body;
    const createImprovementProjectDto = CreateImprovementProjectDto.create({
      name,
      directorateResponsibleCodeReference: parseStringNumber(directorateResponsibleCodeReference),
      specificPladecoIds: parseStringToStringArray(specificPladecoIds),
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      legalNorms,
      enabled: parseStringBoolean(enabled),
    });

    new CreateImprovementProject(this.employeeRepository)
      .execute(createImprovementProjectDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  // TODO: validate directorate codes, funding sources and specifics pladeco
  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<ImprovementProjectEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name, directorateResponsibleCodeReference, specificPladecoIds, startDate, endDate, legalNorms, enabled } =
      req.body;
    const updateImprovementProjectDto = UpdateImprovementProjectDto.create({
      id,
      name,
      directorateResponsibleCodeReference: parseStringNumber(directorateResponsibleCodeReference),
      specificPladecoIds: parseStringToStringArray(specificPladecoIds),
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      legalNorms,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateImprovementProject(this.employeeRepository)
      .execute(updateImprovementProjectDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<ImprovementProjectEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getImprovementProjectByIdDto = GetImprovementProjectByIdDto.create({ id });

    new DeleteImprovementProject(this.employeeRepository)
      .execute(getImprovementProjectByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
