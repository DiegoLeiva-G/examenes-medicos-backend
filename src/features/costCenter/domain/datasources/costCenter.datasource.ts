import { type CostCenterEntity } from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type ManagementAreaEntity } from '../../../managementArea';
import { type DirectorateEntity } from '../../../directorate';

export abstract class CostCenterDatasource {
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CostCenterEntity[]>>;
  abstract getAllByManagementAreaAndDirectorate(
    managementAreaCode: ManagementAreaEntity['Codigo_AreaGestion'],
    directorateCode: DirectorateEntity['Codigo_Direccion'],
  ): Promise<PaginationResponseEntity<CostCenterEntity[]>>;
}
