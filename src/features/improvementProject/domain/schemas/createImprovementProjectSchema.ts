import { ImprovementProjectOptionalDefaultsSchema } from '../../../_global';
import { z } from 'zod';

export const createImprovementProjectSchema = ImprovementProjectOptionalDefaultsSchema.extend({
  specificPladecoIds: z.string().array(),
});
