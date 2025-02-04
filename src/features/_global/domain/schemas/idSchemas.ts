import { z } from 'zod';

export const idSchema = z.object({
  id: z.string({ message: 'Debe ingresar el id' }),
});

export const managementAreaCodeSchema = z.object({
  Codigo_AreaGestion: z.number({ message: 'Debe ingresar el código' }).min(1),
});

export const directorateCodeSchema = z.object({
  Codigo_Direccion: z.number({ message: 'Debe ingresar el código' }).min(1),
});

// To string id from postgresql with cuid()
export const arrayIdSchema = z.object({
  id: z.array(z.string().cuid()),
});
