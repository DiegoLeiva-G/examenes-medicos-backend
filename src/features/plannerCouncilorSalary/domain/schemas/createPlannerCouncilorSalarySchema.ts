import { PlannerCouncilorSalaryOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerCouncilorSalarySchema = PlannerCouncilorSalaryOptionalDefaultsSchema.omit({
  costCenterCodeReference: true,
  directorateCodeReference: true,
  managementAreaCodeReference: true,
}).extend({
  plannerId: z.string(),
});
