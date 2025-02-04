import { type CostCenterDatasource, type CostCenterEntity, type CostCenterRepository } from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';
import { type ManagementAreaEntity } from '../../managementArea';
import { type DirectorateEntity } from '../../directorate';

export class CostCenterRepositoryImpl implements CostCenterRepository {
  constructor(private readonly datasource: CostCenterDatasource) {}

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getAllByManagementAreaAndDirectorate(
    managementAreaCode: ManagementAreaEntity['Codigo_AreaGestion'],
    directorateCode: DirectorateEntity['Codigo_Direccion'],
  ): Promise<PaginationResponseEntity<CostCenterEntity[]>> {
    return await this.datasource.getAllByManagementAreaAndDirectorate(managementAreaCode, directorateCode);
  }
}
