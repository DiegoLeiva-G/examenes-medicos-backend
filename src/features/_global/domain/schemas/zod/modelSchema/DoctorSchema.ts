import { z } from 'zod';

/////////////////////////////////////////
// DOCTOR SCHEMA
/////////////////////////////////////////

export const DoctorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
  secondaryLastName: z.string().nullish(),
  nameProfession: z.string().array(),
  specialization: z.string().array(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Doctor = z.infer<typeof DoctorSchema>

/////////////////////////////////////////
// DOCTOR PARTIAL SCHEMA
/////////////////////////////////////////

export const DoctorPartialSchema = DoctorSchema.partial()

export type DoctorPartial = z.infer<typeof DoctorPartialSchema>

/////////////////////////////////////////
// DOCTOR OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DoctorOptionalDefaultsSchema = DoctorSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DoctorOptionalDefaults = z.infer<typeof DoctorOptionalDefaultsSchema>

export default DoctorSchema;
