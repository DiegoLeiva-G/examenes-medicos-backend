import { PlannerHiringOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerHiringSchema = PlannerHiringOptionalDefaultsSchema.extend({
  plannerId: z.string(),
});
