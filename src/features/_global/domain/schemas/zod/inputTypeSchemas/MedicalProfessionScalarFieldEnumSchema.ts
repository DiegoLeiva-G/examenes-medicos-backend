import { z } from 'zod';

export const MedicalProfessionScalarFieldEnumSchema = z.enum(['id','name','specialization','deleted','createdAt','updatedAt']);

export default MedicalProfessionScalarFieldEnumSchema;
