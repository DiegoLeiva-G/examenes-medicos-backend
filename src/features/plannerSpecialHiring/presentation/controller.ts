import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  type PlannerSpecialHiringGetByIdResponseEntity,
  GetPlannerSpecialHiringByIdDto,
  GetPlannerSpecialHiringById,
  type PlannerSpecialHiringEntity,
  RequestPlannerSpecialHiringDto,
  RequestPlannerSpecialHiring,
  type PlannerSpecialHiringRepository,
  type PlannerSpecialHiringRequestResponseEntity,
  GetPlannerSpecialHiringRequestsImprovementProject,
  type PlannerSpecialHiringGetAllImprovementProjectResponseEntity,
  type PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity,
  GetPlannerSpecialHiringRequestsInvestmentInitiative,
  type PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity,
  GetPlannerSpecialHiringRequestDetailImprovementProjectById,
  type PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity,
  GetPlannerSpecialHiringRequestDetailInvestmentInitiativeById,
  type PlannerSpecialHiringRequestDeterminationResponseEntity,
  DeterminatePlannerSpecialHiringDto,
  DeterminatePlannerSpecialHiring,
} from '../domain';
import { parseStringNumber } from '../../../core/helpers';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import { type PlannerSpecialHiringStatus } from '@prisma/client';

interface Params {
  id: string;
}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
  processYear: string;
  status: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerSpecialHiringEntity, 'id'>>> {}

export class PlannerSpecialHiringController {
  //* Dependency injection
  constructor(private readonly plannerSpecialHiringRepository: PlannerSpecialHiringRepository) {}

  public getPlannerSpecialHiringById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSpecialHiringGetByIdResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSpecialHiringByIdDto = GetPlannerSpecialHiringByIdDto.create({ id });

    new GetPlannerSpecialHiringById(this.plannerSpecialHiringRepository)
      .execute(getPlannerSpecialHiringByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public requestPlannerSpecialHiring = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSpecialHiringRequestResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { plannerId, directorateCodeReference } = req.body;
    const requestPlannerSpecialHiringDto = RequestPlannerSpecialHiringDto.create({
      plannerId,
      directorateCodeReference: parseStringNumber(directorateCodeReference),
    });

    new RequestPlannerSpecialHiring(this.plannerSpecialHiringRepository)
      .execute(requestPlannerSpecialHiringDto)
      .then(result => res.status(HttpCode.CREATED).json({ data: result }))
      .catch(next);
  };

  public getAllPlannerSpecialHiringRequestImprovementProject = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<
      SuccessResponse<PaginationResponseEntity<PlannerSpecialHiringGetAllImprovementProjectResponseEntity[]>>
    >,
    next: NextFunction,
  ): void => {
    const { page = 1, search = '', limit = '10', processYear, status } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetPlannerSpecialHiringRequestsImprovementProject(this.plannerSpecialHiringRepository)
      .execute(
        paginationDto,
        processYear ? +processYear : new Date().getFullYear(),
        status as PlannerSpecialHiringStatus,
      )
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  // TODO: validate status and process year like dto
  public getAllPlannerSpecialHiringRequestInvestmentInitiative = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<
      SuccessResponse<PaginationResponseEntity<PlannerSpecialHiringGetAllInvestmentInitiativeResponseEntity[]>>
    >,
    next: NextFunction,
  ): void => {
    const { page = 1, search = '', limit = '10', processYear, status } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetPlannerSpecialHiringRequestsInvestmentInitiative(this.plannerSpecialHiringRepository)
      .execute(
        paginationDto,
        processYear ? +processYear : new Date().getFullYear(),
        status as PlannerSpecialHiringStatus,
      )
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  // TODO: validate status and process year like dto
  public getPlannerSpecialHiringRequestDetailImprovementProjectById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSpecialHiringRequestDetailImprovementProjectResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSpecialHiringByIdDto = GetPlannerSpecialHiringByIdDto.create({ id });

    new GetPlannerSpecialHiringRequestDetailImprovementProjectById(this.plannerSpecialHiringRepository)
      .execute(getPlannerSpecialHiringByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public getPlannerSpecialHiringRequestDetailInvestmentInitiativeById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSpecialHiringRequestDetailInvestmentInitiativeResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerSpecialHiringByIdDto = GetPlannerSpecialHiringByIdDto.create({ id });

    new GetPlannerSpecialHiringRequestDetailInvestmentInitiativeById(this.plannerSpecialHiringRepository)
      .execute(getPlannerSpecialHiringByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public determinatePlannerSpecialHiring = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSpecialHiringRequestDeterminationResponseEntity>>,
    next: NextFunction,
  ): void => {
    const { status, observation } = req.body;
    const { id } = req.params;
    const determinatePlannerSpecialHiringDto = DeterminatePlannerSpecialHiringDto.create({
      id,
      observation,
      status: status as PlannerSpecialHiringStatus,
    });

    new DeterminatePlannerSpecialHiring(this.plannerSpecialHiringRepository)
      .execute(determinatePlannerSpecialHiringDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
