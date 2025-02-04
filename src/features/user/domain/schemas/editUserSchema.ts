import { z } from 'zod';
import { idSchema, UserPartialSchema } from '../../../_global';

export const editUserWithCU = z
  .object({
    enabled: z.boolean().optional(),
  })
  .merge(idSchema);

const passwordValidation = z.object({
  password: z.string({ message: 'Debe ingresar la contraseña' }).min(6, 'Debe tener al menos 6 caracteres').optional(),
  newPassword: z
    .string({ message: 'Debe repetir la contraseña' })
    .min(6, 'Debe tener al menos 6 caracteres')
    .optional(),
  repeatPassword: z
    .string({ message: 'Debe repetir la contraseña' })
    .min(6, 'Debe tener al menos 6 caracteres')
    .optional(),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const applyPasswordValidations = (schema: typeof passwordValidation) => {
  return schema
    .refine(data => !(data.password && !data.newPassword), {
      message: 'Debe ingresar la nueva contraseña',
      path: ['newPassword'],
    })
    .refine(data => !(!data.password && (data.newPassword ?? data.repeatPassword)), {
      message: 'Debe ingresar la contraseña actual',
      path: ['password'],
    })
    .refine(data => !(data.password && data.newPassword && !data.repeatPassword), {
      message: 'Debe repetir la nueva contraseña',
      path: ['repeatPassword'],
    })
    .refine(data => data.newPassword === data.repeatPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['repeatPassword'],
    });
};

export const editLocalUserSchema = applyPasswordValidations(
  passwordValidation.extend({ enabled: z.boolean().optional() }).merge(idSchema),
);

export const editLocalRootUserSchema = applyPasswordValidations(
  UserPartialSchema.extend(passwordValidation.shape).merge(idSchema),
);
