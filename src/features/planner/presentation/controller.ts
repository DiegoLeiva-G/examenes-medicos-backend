import { type NextFunction, type Request, type Response } from 'express';
import { type AllInterfaceString, HttpCode, type SuccessResponse } from '../../../core';
import {
  CreatePlannerToInvestmentInitiative,
  CreatePlannerToImprovementProject,
  CreatePlannerToInvestmentInitiativeDto,
  CreatePlannerToImprovementProjectDto,
  GetPlannerById,
  GetPlannerByIdDto,
  GetPlannersByInvestmentInitiativeId,
  GetPlannersByImprovementProjectId,
  type PlannerEntity,
  type PlannerRepository,
  type PlannerSummaryEntity,
  UpdatePlanner,
  UpdatePlannerDto,
} from '../domain';
import { type PaginationResponseEntity } from '../../_global';
import { parseStringNumber } from '../../../core/helpers';
import {
  GetInvestmentInitiativeById,
  GetInvestmentInitiativeByIdDto,
  type InvestmentInitiativeEntity,
  type InvestmentInitiativeRepository,
} from '../../investmentInitiative';
import {
  GetImprovementProjectById,
  GetImprovementProjectByIdDto,
  type ImprovementProjectEntity,
  type ImprovementProjectRepository,
} from '../../improvementProject';

interface Params {
  id: string;
}

interface RequestBody extends Partial<AllInterfaceString<Omit<PlannerEntity, 'id'>>> {}

interface RequestQuery {
  page: string;
  limit: string;
  search: string;
  investmentInitiativeId: InvestmentInitiativeEntity['id'];
  improvementProjectId: ImprovementProjectEntity['id'];
}

export class PlannerController {
  //* Dependency injection
  constructor(
    private readonly plannerRepository: PlannerRepository,
    private readonly investmentInitiativeRepository: InvestmentInitiativeRepository,
    private readonly improvementProjectRepository: ImprovementProjectRepository,
  ) {}

  public getAllPlannersByInvestmentInitiativeId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<PlannerSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { investmentInitiativeId } = req.query;
    const getInvestmentInitiativeByIdDto = GetInvestmentInitiativeByIdDto.create({ id: investmentInitiativeId });

    new GetInvestmentInitiativeById(this.investmentInitiativeRepository)
      .execute(getInvestmentInitiativeByIdDto)
      .then(result => {
        new GetPlannersByInvestmentInitiativeId(this.plannerRepository)
          .execute(result.id)
          .then(result => res.json({ data: result }))
          .catch(error => {
            next(error);
          });
      })
      .catch(next);
  };

  public getAllPlannersByImprovementProjectId = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<PlannerSummaryEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { improvementProjectId } = req.query;
    const getImprovementProjectByIdDto = GetImprovementProjectByIdDto.create({ id: improvementProjectId });

    new GetImprovementProjectById(this.improvementProjectRepository)
      .execute(getImprovementProjectByIdDto)
      .then(result => {
        new GetPlannersByImprovementProjectId(this.plannerRepository)
          .execute(improvementProjectId)
          .then(result => res.json({ data: result }))
          .catch(error => {
            next(error);
          });
      })
      .catch(next);
  };

  public getPlannerById = (
    req: Request<Params>,
    res: Response<SuccessResponse<PlannerSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const getPlannerByIdDto = GetPlannerByIdDto.create({ id });

    new GetPlannerById(this.plannerRepository)
      .execute(getPlannerByIdDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };

  public createPlannerToInvestmentInitiative = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { name, year, investmentInitiativeId = '' } = req.body;
    const getInvestmentInitiativeByIdDto = GetInvestmentInitiativeByIdDto.create({ id: investmentInitiativeId });

    new GetInvestmentInitiativeById(this.investmentInitiativeRepository)
      .execute(getInvestmentInitiativeByIdDto)
      .then(resultInvestmentInitiativeById => {
        const createPlannerDto = CreatePlannerToInvestmentInitiativeDto.create({
          name,
          year: parseStringNumber(year),
          investmentInitiativeId: resultInvestmentInitiativeById.id,
        });

        new CreatePlannerToInvestmentInitiative(this.plannerRepository)
          .execute(createPlannerDto)
          .then(resultCreatePlannerToInvestmentInitiative =>
            res.status(HttpCode.CREATED).json({ data: resultCreatePlannerToInvestmentInitiative }),
          )
          .catch(next);
      })
      .catch(next);
  };

  public createPlannerToImprovementProject = (
    req: Request<unknown, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { name, year, improvementProjectId = '' } = req.body;
    const getImprovementProjectByIdDto = GetImprovementProjectByIdDto.create({ id: improvementProjectId });

    new GetImprovementProjectById(this.improvementProjectRepository)
      .execute(getImprovementProjectByIdDto)
      .then(resultGetImprovementProjectById => {
        const createPlannerDto = CreatePlannerToImprovementProjectDto.create({
          name,
          year: parseStringNumber(year),
          improvementProjectId: resultGetImprovementProjectById.id,
        });

        new CreatePlannerToImprovementProject(this.plannerRepository)
          .execute(createPlannerDto)
          .then(resultCreatePlannerToImprovementProject =>
            res.status(HttpCode.CREATED).json({ data: resultCreatePlannerToImprovementProject }),
          )
          .catch(next);
      })
      .catch(next);
  };

  public updatePlanner = (
    req: Request<Params, unknown, RequestBody>,
    res: Response<SuccessResponse<PlannerSummaryEntity>>,
    next: NextFunction,
  ): void => {
    const { id } = req.params;
    const { name } = req.body;
    const updatePlannerDto = UpdatePlannerDto.create({ id, name });

    new UpdatePlanner(this.plannerRepository)
      .execute(updatePlannerDto)
      .then(result => res.json({ data: result }))
      .catch(next);
  };
}
