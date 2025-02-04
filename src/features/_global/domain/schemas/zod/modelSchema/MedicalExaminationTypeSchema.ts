import { z } from 'zod';

/////////////////////////////////////////
// MEDICAL EXAMINATION TYPE SCHEMA
/////////////////////////////////////////

export const MedicalExaminationTypeSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  observation: z.string().nullish(),
  anexes: z.string().nullish(),
  conclusion: z.string().nullish(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MedicalExaminationType = z.infer<typeof MedicalExaminationTypeSchema>

/////////////////////////////////////////
// MEDICAL EXAMINATION TYPE PARTIAL SCHEMA
/////////////////////////////////////////

export const MedicalExaminationTypePartialSchema = MedicalExaminationTypeSchema.partial()

export type MedicalExaminationTypePartial = z.infer<typeof MedicalExaminationTypePartialSchema>

/////////////////////////////////////////
// MEDICAL EXAMINATION TYPE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const MedicalExaminationTypeOptionalDefaultsSchema = MedicalExaminationTypeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type MedicalExaminationTypeOptionalDefaults = z.infer<typeof MedicalExaminationTypeOptionalDefaultsSchema>

export default MedicalExaminationTypeSchema;
