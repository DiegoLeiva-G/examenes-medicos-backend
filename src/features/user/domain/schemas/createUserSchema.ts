import { z } from 'zod';
import { UserOptionalDefaultsSchema, UserTypeSchema } from '../../../_global';

export const createUserWithEmployeeIdSchema = z.object({
  employeeId: z.string({ message: 'Debe ingresar el id del funcionario' }),
  enabled: z.boolean().optional(),
});

export const createLocalRootUserSchema = UserOptionalDefaultsSchema.extend({
  type: UserTypeSchema.optional(),
  username: z.string(),
  tag: z.string(),
  password: z.string({ message: 'Debe ingresar la contraseña' }).min(6, 'Debe tener al menos 6 caracteres'),
  repeatPassword: z.string({ message: 'Debe repetir la contraseña' }).min(6, 'Debe tener al menos 6 caracteres'),
}).refine(data => data.password === data.repeatPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['repeatPassword'],
});
