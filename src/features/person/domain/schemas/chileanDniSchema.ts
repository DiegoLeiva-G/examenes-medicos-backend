import { validateChileanDNI } from '../../../../core/helpers';
import { z } from 'zod';

export const chileanDniSchema = z
  .object({
    rut: z.string({ message: 'Debe ingresar el rut' }),
  })
  .refine(data => validateChileanDNI(data.rut), {
    message: 'El rut no es válido',
    path: ['rut'],
  });
