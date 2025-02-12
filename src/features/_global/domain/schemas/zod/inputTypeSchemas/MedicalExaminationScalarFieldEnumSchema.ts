import { z } from 'zod';

export const MedicalExaminationScalarFieldEnumSchema = z.enum(['id','dateExam','observation','observation2','dimension','dimension2','descriptionDimension','anexes','anexes2','descriptionAnexes','conclusion','medicalPatientId','doctorId','medicalExaminationTypeId','deleted','createdAt','updatedAt']);

export default MedicalExaminationScalarFieldEnumSchema;
