import { type NextFunction, type Request, type Response } from 'express';
import { type BaseListFilter, type SuccessResponse } from '../../../core';
import {
  type CostCenterEntity,
  type CostCenterRepository,
  GetCostCenters,
  GetCostCentersByManagementAreaAndDirectorate,
} from '../domain';
import { PaginationDto, type PaginationResponseEntity } from '../../_global';
import {
  GetManagementAreaByCode,
  GetManagementAreaByCodeDto,
  type ManagementAreaRepository,
} from '../../managementArea';
import { type DirectorateRepository, GetDirectorateByCode, GetDirectorateByCodeDto } from '../../directorate';
import { parseStringNumber } from '../../../core/helpers';

interface RequestQuery extends BaseListFilter {
  managementAreaCode: string;
  directorateCode: string;
}

export class CostCenterController {
  //* Dependency injection
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementAreaRepository: ManagementAreaRepository,
    private readonly directorateRepository: DirectorateRepository,
  ) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<CostCenterEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const paginationDto = PaginationDto.create({ page: +page, limit: +limit, search });

    new GetCostCenters(this.costCenterRepository)
      .execute(paginationDto)
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };

  public getAllByManagementAreaAndDirectorate = (
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<SuccessResponse<PaginationResponseEntity<CostCenterEntity[]>>>,
    next: NextFunction,
  ): void => {
    const { managementAreaCode = '', directorateCode = '' } = req.query;

    const getManagementAreaByCodeDto = GetManagementAreaByCodeDto.create({
      Codigo_AreaGestion: parseStringNumber(managementAreaCode) ?? 0,
    });

    new GetManagementAreaByCode(this.managementAreaRepository)
      .execute(getManagementAreaByCodeDto)
      .then(resultManagementArea => {
        const getDirectorateByCodeDto = GetDirectorateByCodeDto.create({
          Codigo_Direccion: parseStringNumber(directorateCode) ?? 0,
        });

        new GetDirectorateByCode(this.directorateRepository)
          .execute(getDirectorateByCodeDto)
          .then(resultDirectorate => {
            new GetCostCentersByManagementAreaAndDirectorate(this.costCenterRepository)
              .execute(resultManagementArea.Codigo_AreaGestion, resultDirectorate.Codigo_Direccion)
              .then(result => res.json({ data: result }))
              .catch(error => {
                next(error);
              });
          })
          .catch(error => {
            next(error);
          });
      })
      .catch(error => {
        next(error);
      });
  };
}
