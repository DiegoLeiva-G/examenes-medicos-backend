import { InvestmentInitiativeOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createInvestmentInitiativeSchema = InvestmentInitiativeOptionalDefaultsSchema.extend({
  directorateCoResponsibleCodeReference: z.number().int().array().optional(),
  fundingSourceIds: z.string().array(),
  specificPladecoIds: z.string().array(),
});
