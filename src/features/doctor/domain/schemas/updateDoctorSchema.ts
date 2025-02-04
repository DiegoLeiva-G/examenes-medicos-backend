import { z } from 'zod';
import { DoctorPartialSchema } from '../../../_global';

export const updateDoctorSchema = DoctorPartialSchema.extend({
  email: z.string().email({ message: 'Debe ingresar correctamente el email' }).optional(),
});
