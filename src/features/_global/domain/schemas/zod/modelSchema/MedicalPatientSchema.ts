import { z } from 'zod';

/////////////////////////////////////////
// MEDICAL PATIENT SCHEMA
/////////////////////////////////////////

export const MedicalPatientSchema = z.object({
  id: z.string().cuid(),
  rut: z.string(),
  name: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
  secondaryLastName: z.string().nullish(),
  birthdate: z.coerce.date().nullish(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MedicalPatient = z.infer<typeof MedicalPatientSchema>

/////////////////////////////////////////
// MEDICAL PATIENT PARTIAL SCHEMA
/////////////////////////////////////////

export const MedicalPatientPartialSchema = MedicalPatientSchema.partial()

export type MedicalPatientPartial = z.infer<typeof MedicalPatientPartialSchema>

/////////////////////////////////////////
// MEDICAL PATIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const MedicalPatientOptionalDefaultsSchema = MedicalPatientSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type MedicalPatientOptionalDefaults = z.infer<typeof MedicalPatientOptionalDefaultsSchema>

export default MedicalPatientSchema;
