import { ImprovementProjectPartialSchema } from '../../../_global';
import { z } from 'zod';

export const editImprovementProjectSchema = ImprovementProjectPartialSchema.extend({
  specificPladecoIds: z.string().array().optional(),
});
