import { z } from 'zod';

export const MedicalExaminationScalarFieldEnumSchema = z.enum(['id','dateExam','fur','content','medicalPatientId','doctorId','medicalExaminationTypeId','deleted','createdAt','updatedAt']);

export default MedicalExaminationScalarFieldEnumSchema;
