import { idSchema, PlannerSpecialHiringOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const determinatePlannerSpecialHiringSchema = PlannerSpecialHiringOptionalDefaultsSchema.pick({
  observation: true,
})
  .merge(idSchema)
  .extend({
    status: z.enum(['Approved', 'Rejected']),
  });
