import { PlannerOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

// TODO: change start and end date as optional in prisma.schema
export const createPlannerToInvestmentInitiativeSchema = PlannerOptionalDefaultsSchema.extend({
  investmentInitiativeId: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
