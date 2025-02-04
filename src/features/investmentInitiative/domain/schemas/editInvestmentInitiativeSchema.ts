import { InvestmentInitiativePartialSchema } from '../../../_global';
import { z } from 'zod';

export const editInvestmentInitiativeSchema = InvestmentInitiativePartialSchema.extend({
  fundingSourceIds: z.string().array().optional(),
  specificPladecoIds: z.string().array().optional(),
});
