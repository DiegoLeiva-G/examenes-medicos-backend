import { PlannerPurchaseTaskPartialSchema } from '../../../_global';
import { z } from 'zod';

export const editPlannerPurchaseTaskSchema = PlannerPurchaseTaskPartialSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number().optional(),
});
