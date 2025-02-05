import { z } from 'zod';
import { DoctorPartialSchema } from '../../../_global';

export const updateDoctorSchema = DoctorPartialSchema.extend({
  nameProfession: z.array(z.string()).optional(),
  specialization: z.array(z.string()).optional(),
});
