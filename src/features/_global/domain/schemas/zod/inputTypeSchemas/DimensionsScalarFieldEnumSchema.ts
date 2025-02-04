import { z } from 'zod';

export const DimensionsScalarFieldEnumSchema = z.enum(['id','title','name','measures','description','deleted','createdAt','updatedAt']);

export default DimensionsScalarFieldEnumSchema;
