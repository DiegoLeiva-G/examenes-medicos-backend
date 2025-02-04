import { PlannerSubsidyTaskOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerSubsidyTaskSchema = PlannerSubsidyTaskOptionalDefaultsSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number(),
  plannerSubsidyId: z.string(),
});
