import { z } from 'zod';

/////////////////////////////////////////
// MEDICAL PROFESSION SCHEMA
/////////////////////////////////////////

export const MedicalProfessionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  specialization: z.string(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MedicalProfession = z.infer<typeof MedicalProfessionSchema>

/////////////////////////////////////////
// MEDICAL PROFESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const MedicalProfessionPartialSchema = MedicalProfessionSchema.partial()

export type MedicalProfessionPartial = z.infer<typeof MedicalProfessionPartialSchema>

/////////////////////////////////////////
// MEDICAL PROFESSION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const MedicalProfessionOptionalDefaultsSchema = MedicalProfessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type MedicalProfessionOptionalDefaults = z.infer<typeof MedicalProfessionOptionalDefaultsSchema>

export default MedicalProfessionSchema;
