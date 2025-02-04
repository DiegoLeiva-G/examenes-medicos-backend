import { z } from 'zod';

export const MedicalExaminationScalarFieldEnumSchema = z.enum(['id','dateExam','medicalPatientId','doctorId','MedicalExaminationTypeId','deleted','createdAt','updatedAt']);

export default MedicalExaminationScalarFieldEnumSchema;
