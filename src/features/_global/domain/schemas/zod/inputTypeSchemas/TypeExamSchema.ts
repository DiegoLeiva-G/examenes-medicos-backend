import { z } from 'zod';

export const TypeExamSchema = z.enum(['Ultrasound','Ray','Resonance']);

export type TypeExamType = `${z.infer<typeof TypeExamSchema>}`

export default TypeExamSchema;
