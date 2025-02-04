import { type GetPlannerPurchaseTaskByIdDto } from '../dtos';
import { type PlannerPurchaseTaskExtendedEntity } from '../entities';
import { type PlannerPurchaseTaskRepository } from '../repositories';

export interface GetPlannerPurchaseTaskByIdUseCase {
  execute: (getByIdDto: GetPlannerPurchaseTaskByIdDto) => Promise<PlannerPurchaseTaskExtendedEntity>;
}

export class GetPlannerPurchaseTaskById implements GetPlannerPurchaseTaskByIdUseCase {
  constructor(private readonly repository: PlannerPurchaseTaskRepository) {}

  async execute(getByIdDto: GetPlannerPurchaseTaskByIdDto): Promise<PlannerPurchaseTaskExtendedEntity> {
    return await this.repository.getById(getByIdDto);
  }
}
