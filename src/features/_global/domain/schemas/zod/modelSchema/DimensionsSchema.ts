import { z } from 'zod';

/////////////////////////////////////////
// DIMENSIONS SCHEMA
/////////////////////////////////////////

export const DimensionsSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullish(),
  name: z.string(),
  measures: z.string(),
  description: z.string().nullish(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Dimensions = z.infer<typeof DimensionsSchema>

/////////////////////////////////////////
// DIMENSIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const DimensionsPartialSchema = DimensionsSchema.partial()

export type DimensionsPartial = z.infer<typeof DimensionsPartialSchema>

/////////////////////////////////////////
// DIMENSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DimensionsOptionalDefaultsSchema = DimensionsSchema.merge(z.object({
  id: z.string().cuid().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DimensionsOptionalDefaults = z.infer<typeof DimensionsOptionalDefaultsSchema>

export default DimensionsSchema;
