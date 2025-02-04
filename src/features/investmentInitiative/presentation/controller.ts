import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreateInvestmentInitiative,
  CreateInvestmentInitiativeDto,
  DeleteInvestmentInitiative,
  GetInvestmentInitiativeById,
  GetInvestmentInitiativeByIdDto,
  GetInvestmentInitiatives,
  type InvestmentInitiativeEntity,
  type InvestmentInitiativeEntityToList,
  type InvestmentInitiativeRepository,
  type InvestmentInitiativeSummaryEntity,
  UpdateInvestmentInitiative,
  UpdateInvestmentInitiativeDto,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  parseISOStringToDate,
  parseStringBoolean,
  parseStringNumber,
  parseStringToNumberArray,
  parseStringToStringArray,
} from '../../../core/helpers';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<InvestmentInitiativeEntity, 'id'>>> {
  fundingSourceIds: string;
  specificPladecoIds: string;
}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
}

export class InvestmentInitiativeController {
  //* Dependency injection
  constructor(private readonly employeeRepository: InvestmentInitiativeRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetInvestmentInitiatives(this.employeeRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getById = (
    req: Request<Params>,
    res: Response<SuccessResponse<InvestmentInitiativeSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getInvestmentInitiativeByIdDto = GetInvestmentInitiativeByIdDto.create({ id });

    new GetInvestmentInitiativeById(this.employeeRepository)
      .execute(getInvestmentInitiativeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  // TODO: validate directorate codes, funding sources and specifics pladeco
  public create = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<InvestmentInitiativeEntity>>,
    next: NextFunction,
  ): void => {
    const {
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      fundingSourceIds,
      specificPladecoIds,
      startDate,
      endDate,
      legalNorms,
      enabled,
    } = req.body;
    const createInvestmentInitiativeDto = CreateInvestmentInitiativeDto.create({
      name,
      directorateResponsibleCodeReference: parseStringNumber(directorateResponsibleCodeReference),
      directorateCoResponsibleCodeReference: parseStringToNumberArray(directorateCoResponsibleCodeReference),
      fundingSourceIds: parseStringToStringArray(fundingSourceIds),
      specificPladecoIds: parseStringToStringArray(specificPladecoIds),
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      legalNorms,
      enabled: parseStringBoolean(enabled),
    });

    new CreateInvestmentInitiative(this.employeeRepository)
      .execute(createInvestmentInitiativeDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  // TODO: validate directorate codes, funding sources and specifics pladeco
  public update = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<InvestmentInitiativeEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const {
      name,
      directorateResponsibleCodeReference,
      directorateCoResponsibleCodeReference,
      fundingSourceIds,
      specificPladecoIds,
      startDate,
      endDate,
      legalNorms,
      enabled,
    } = req.body;
    const updateInvestmentInitiativeDto = UpdateInvestmentInitiativeDto.create({
      id,
      name,
      directorateResponsibleCodeReference: parseStringNumber(directorateResponsibleCodeReference),
      directorateCoResponsibleCodeReference: parseStringToNumberArray(directorateCoResponsibleCodeReference),
      fundingSourceIds: parseStringToStringArray(fundingSourceIds),
      specificPladecoIds: parseStringToStringArray(specificPladecoIds),
      startDate: parseISOStringToDate(startDate),
      endDate: parseISOStringToDate(endDate),
      legalNorms,
      enabled: parseStringBoolean(enabled),
    });

    new UpdateInvestmentInitiative(this.employeeRepository)
      .execute(updateInvestmentInitiativeDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public delete = (
    req: Request<Params>,
    res: Response<SuccessResponse<InvestmentInitiativeEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getInvestmentInitiativeByIdDto = GetInvestmentInitiativeByIdDto.create({ id });

    new DeleteInvestmentInitiative(this.employeeRepository)
      .execute(getInvestmentInitiativeByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
