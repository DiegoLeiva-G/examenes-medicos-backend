import { z } from 'zod';
import { EmployeePartialSchema } from '../../../_global';

export const editEmployeeSchema = EmployeePartialSchema.extend({
  email: z.string().email({ message: 'Debe ingresar correctamente el email' }).optional(),
});
