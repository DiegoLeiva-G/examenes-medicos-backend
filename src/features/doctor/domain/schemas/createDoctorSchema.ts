import { z } from 'zod';
import { DoctorOptionalDefaultsSchema } from '../../../_global';

export const createDoctorSchema = DoctorOptionalDefaultsSchema.extend({
  nameProfession: z.array(z.string()).optional(),
  specialization: z.array(z.string()).optional(),
});
