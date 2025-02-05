import { z } from 'zod';

export const MedicalExaminationTypeScalarFieldEnumSchema = z.enum(['id','name','type','deleted','createdAt','updatedAt']);

export default MedicalExaminationTypeScalarFieldEnumSchema;
