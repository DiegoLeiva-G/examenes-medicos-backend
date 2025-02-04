import { PlannerHiringTaskOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerHiringTaskSchema = PlannerHiringTaskOptionalDefaultsSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number(),
  plannerHiringId: z.string(),
});
