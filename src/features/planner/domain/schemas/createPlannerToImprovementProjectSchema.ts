import { PlannerOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

// TODO: change start and end date as optional in prisma.schema
export const createPlannerToImprovementProjectSchema = PlannerOptionalDefaultsSchema.extend({
  improvementProjectId: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
