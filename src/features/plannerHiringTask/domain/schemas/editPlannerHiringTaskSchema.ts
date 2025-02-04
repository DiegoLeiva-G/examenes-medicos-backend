import { PlannerHiringTaskPartialSchema } from '../../../_global';
import { z } from 'zod';

export const editPlannerHiringTaskSchema = PlannerHiringTaskPartialSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number().optional(),
});
