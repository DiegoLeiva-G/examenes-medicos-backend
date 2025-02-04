import {
  type CreateInvestmentInitiativeDto,
  type GetInvestmentInitiativeByIdDto,
  type InvestmentInitiativeDatasource,
  type InvestmentInitiativeEntity,
  type InvestmentInitiativeEntityToList,
  type InvestmentInitiativeRepository,
  type InvestmentInitiativeSummaryEntity,
  type UpdateInvestmentInitiativeDto,
} from '../domain';
import { type PaginationDto, type PaginationResponseEntity } from '../../_global';

export class InvestmentInitiativeRepositoryImpl implements InvestmentInitiativeRepository {
  constructor(private readonly datasource: InvestmentInitiativeDatasource) {}

  async create(createDto: CreateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    return await this.datasource.create(createDto);
  }

  async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<InvestmentInitiativeEntityToList[]>> {
    return await this.datasource.getAll(pagination);
  }

  async getById(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeSummaryEntity> {
    return await this.datasource.getById(getByIdDto);
  }

  async update(updateDto: UpdateInvestmentInitiativeDto): Promise<InvestmentInitiativeEntity> {
    return await this.datasource.update(updateDto);
  }

  async delete(getByIdDto: GetInvestmentInitiativeByIdDto): Promise<InvestmentInitiativeEntity> {
    return await this.datasource.delete(getByIdDto);
  }
}
