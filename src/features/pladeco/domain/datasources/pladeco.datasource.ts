import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import { type SpecificPladecoToListEntity, type StrategicPladecoToListEntity } from '../entities';

export abstract class PladecoDatasource {
  abstract getStrategics(pagination: PaginationDto): Promise<PaginationResponseEntity<StrategicPladecoToListEntity[]>>;
  abstract getSpecifics(pagination: PaginationDto): Promise<PaginationResponseEntity<SpecificPladecoToListEntity[]>>;
}
