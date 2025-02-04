import {
  type CreateInvestmentInitiativeDto,
  type GetInvestmentInitiativeByIdDto,
  type UpdateInvestmentInitiativeDto,
} from '../dtos';
import {
  type InvestmentInitiativeEntity,
  type InvestmentInitiativeEntityToList,
  type InvestmentInitiativeSummaryEntity,
} from '../entities';
import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';

export abstract class InvestmentInitiativeDatasource {
  abstract create(createDto: CreateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity>;
  abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>>;
  abstract getById(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeSummaryEntity>;
  abstract update(updateDto: UpdateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity>;
  abstract delete(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeEntity>;
}
