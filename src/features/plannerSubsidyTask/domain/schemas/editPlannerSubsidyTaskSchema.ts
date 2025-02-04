import { PlannerSubsidyTaskPartialSchema } from '../../../_global';
import { z } from 'zod';

export const editPlannerSubsidyTaskSchema = PlannerSubsidyTaskPartialSchema.omit({
  status: true,
}).extend({
  totalBudgetAmount: z.number().optional(),
});
