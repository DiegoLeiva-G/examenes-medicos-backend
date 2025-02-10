import { z } from 'zod';

export const MedicalExaminationTypeScalarFieldEnumSchema = z.enum(['id','name','type','observation','dimension','measures','diagnosticDimension','anexes','diagnosticAnexes','conclusion','deleted','createdAt','updatedAt']);

export default MedicalExaminationTypeScalarFieldEnumSchema;
