import { PlannerSpecialHiringOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const requestPlannerSpecialHiringSchema = PlannerSpecialHiringOptionalDefaultsSchema.omit({
  status: true,
  managementAreaCodeReference: true,
  costCenterCodeReference: true,
  observation: true,
}).extend({
  plannerId: z.string(),
});
