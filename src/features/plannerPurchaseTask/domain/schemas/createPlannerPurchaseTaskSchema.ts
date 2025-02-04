import { PlannerPurchaseTaskOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerPurchaseTaskSchema = PlannerPurchaseTaskOptionalDefaultsSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number(),
  plannerPurchaseId: z.string(),
});
