import { z } from 'zod';

export const MedicalExaminationTypeScalarFieldEnumSchema = z.enum(['id','name','type','observation','observation2','dimension','dimension2','descriptionDimension','anexes','anexes2','descriptionAnexes','conclusion','deleted','createdAt','updatedAt']);

export default MedicalExaminationTypeScalarFieldEnumSchema;
