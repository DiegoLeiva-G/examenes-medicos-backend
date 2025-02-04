import { PlannerSubsidyOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerSubsidySchema = PlannerSubsidyOptionalDefaultsSchema.omit({
  costCenterCodeReference: true,
  managementAreaCodeReference: true,
  directorateCodeReference: true,
}).extend({
  plannerId: z.string(),
});
