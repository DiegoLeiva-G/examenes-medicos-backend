import { z } from 'zod';
import { DoctorOptionalDefaultsSchema } from '../../../_global';

export const createDoctorSchema = DoctorOptionalDefaultsSchema.extend({
  email: z.string().email({ message: 'Debe ingresar correctamente el email' }).optional(),
});
