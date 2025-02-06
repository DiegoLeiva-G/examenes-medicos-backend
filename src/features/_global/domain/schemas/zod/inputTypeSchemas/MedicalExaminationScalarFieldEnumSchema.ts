import { z } from 'zod';

export const MedicalExaminationScalarFieldEnumSchema = z.enum(['id','dateExam','observation','anexes','conclusion','titleDimension','nameDimension','measureDimension','descriptionDimension','medicalPatientId','doctorId','medicalExaminationTypeId','deleted','createdAt','updatedAt']);

export default MedicalExaminationScalarFieldEnumSchema;
