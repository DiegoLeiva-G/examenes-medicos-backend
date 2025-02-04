import { z } from 'zod';
import { EmployeeOptionalDefaultsSchema } from '../../../_global';

export const createEmployeeSchema = EmployeeOptionalDefaultsSchema.extend({
  email: z.string().email({ message: 'Debe ingresar correctamente el email' }).optional(),
  personId: z.string({ message: 'Debe ingresar personId' }),
});
