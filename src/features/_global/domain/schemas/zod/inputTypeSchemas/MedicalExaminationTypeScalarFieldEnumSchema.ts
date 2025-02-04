import { z } from 'zod';

export const MedicalExaminationTypeScalarFieldEnumSchema = z.enum(['id','name','observation','anexes','conclusion','deleted','createdAt','updatedAt']);

export default MedicalExaminationTypeScalarFieldEnumSchema;
