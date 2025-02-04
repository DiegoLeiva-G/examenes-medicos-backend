import { type PaginationDto, type PaginationResponseEntity } from '../../../_global';
import {
  type CreateIncomeBudgetDetailDto,
  type CreateIncomeBudgetDto,
  type GetIncomeBudgetByIdDto,
  type GetIncomeBudgetDetailByIdDto,
  type UpdateIncomeBudgetDetailDto,
} from '../dtos';
import type { IncomeBudgetDetailSummaryEntity, IncomeBudgetSummaryEntity } from '../entities';

export abstract class IncomeBudgetDatasource {
  abstract createIncomeBudget(createDto: CreateIncomeBudgetDto): Promise<IncomeBudgetSummaryEntity>;
  abstract createIncomeBudgetDetail(createDto: CreateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity>;
  abstract getAllIncomeBudgets(
    pagination: PaginationDto,
  ): Promise<PaginationResponseEntity<IncomeBudgetSummaryEntity[]>>;
  abstract getAllIncomeBudgetDetailsByIncomeBudgetId(
    pagination: PaginationDto,
    incomeBudgetId: IncomeBudgetSummaryEntity['id'],
  ): Promise<PaginationResponseEntity<IncomeBudgetDetailSummaryEntity[]>>;
  abstract getIncomeBudgetById(getByIdDto: GetIncomeBudgetByIdDto): Promise<IncomeBudgetSummaryEntity>;
  abstract getIncomeBudgetDetailById(
    getByIdDto: GetIncomeBudgetDetailByIdDto,
  ): Promise<IncomeBudgetDetailSummaryEntity>;
  abstract updateIncomeBudgetDetail(updateDto: UpdateIncomeBudgetDetailDto): Promise<IncomeBudgetDetailSummaryEntity>;
  abstract deleteIncomeBudgetDetailById(
    getByIdDto: GetIncomeBudgetDetailByIdDto,
  ): Promise<IncomeBudgetDetailSummaryEntity>;
}
