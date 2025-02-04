import { z } from 'zod';

export const DoctorScalarFieldEnumSchema = z.enum(['id','rut','name','middleName','lastName','secondaryLastName','address','email','phone','birthdate','deleted','createdAt','updatedAt']);

export default DoctorScalarFieldEnumSchema;
