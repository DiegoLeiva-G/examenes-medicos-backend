import { z } from 'zod';

/////////////////////////////////////////
// MEDICAL EXAMINATION SCHEMA
/////////////////////////////////////////

export const MedicalExaminationSchema = z.object({
  id: z.string().cuid(),
  dateExam: z.coerce.date(),
  observation: z.string().nullish(),
  observation2: z.string().nullish(),
  dimension: z.string().nullish(),
  dimension2: z.string().nullish(),
  descriptionDimension: z.string().nullish(),
  anexes: z.string().nullish(),
  anexes2: z.string().nullish(),
  descriptionAnexes: z.string().nullish(),
  conclusion: z.string().nullish(),
  medicalPatientId: z.string(),
  doctorId: z.string(),
  medicalExaminationTypeId: z.string(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type MedicalExamination = z.infer<typeof MedicalExaminationSchema>

/////////////////////////////////////////
// MEDICAL EXAMINATION PARTIAL SCHEMA
/////////////////////////////////////////

export const MedicalExaminationPartialSchema = MedicalExaminationSchema.partial()

export type MedicalExaminationPartial = z.infer<typeof MedicalExaminationPartialSchema>

/////////////////////////////////////////
// MEDICAL EXAMINATION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const MedicalExaminationOptionalDefaultsSchema = MedicalExaminationSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type MedicalExaminationOptionalDefaults = z.infer<typeof MedicalExaminationOptionalDefaultsSchema>

export default MedicalExaminationSchema;
