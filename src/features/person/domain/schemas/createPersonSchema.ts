import { PersonOptionalDefaultsSchema } from '../../../index';
import { validateChileanDNI } from '../../../../core/helpers';

export const createPersonSchema = PersonOptionalDefaultsSchema.refine(data => validateChileanDNI(data.rut), {
  message: 'El rut no es válido',
  path: ['rut'],
});
