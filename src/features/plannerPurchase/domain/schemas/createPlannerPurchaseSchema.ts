import { PlannerPurchaseOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createPlannerPurchaseSchema = PlannerPurchaseOptionalDefaultsSchema.extend({
  plannerId: z.string(),
});
