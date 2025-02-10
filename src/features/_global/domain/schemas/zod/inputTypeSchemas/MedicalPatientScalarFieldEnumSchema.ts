import { z } from 'zod';

export const MedicalPatientScalarFieldEnumSchema = z.enum(['id','rut','name','middleName','lastName','secondaryLastName','birthdate','deleted','createdAt','updatedAt']);

export default MedicalPatientScalarFieldEnumSchema;
