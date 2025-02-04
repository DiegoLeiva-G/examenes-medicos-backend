import { type CostCenterEntity } from '../entities';
import { type CostCenterRepository } from '../repositories';
import { type PaginationResponseEntity } from '../../../_global';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';

export interface GetCostCentersByManagementAreaAndDirectorateUseCase {
  execute: (
    managementAreaCode: ManagementAreaEntity['Codigo_AreaGestion'],
    directorateCode: DirectorateEntity['Codigo_Direccion'],
  ) => Promise<PaginationResponseEntity<CostCenterEntity[]>>;
}

export class GetCostCentersByManagementAreaAndDirectorate
  implements GetCostCentersByManagementAreaAndDirectorateUseCase
{
  constructor(private readonly repository: CostCenterRepository) {}

  async execute(
    managementAreaCode: ManagementAreaEntity['Codigo_AreaGestion'],
    directorateCode: DirectorateEntity['Codigo_Direccion'],
  ): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    return await this.repository.getAllByManagementAreaAndDirectorate(managementAreaCode, directorateCode);
  }
}
