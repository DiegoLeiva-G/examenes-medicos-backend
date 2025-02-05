import { z } from 'zod';

export const DoctorScalarFieldEnumSchema = z.enum(['id','name','middleName','lastName','secondaryLastName','nameProfession','specialization','deleted','createdAt','updatedAt']);

export default DoctorScalarFieldEnumSchema;
