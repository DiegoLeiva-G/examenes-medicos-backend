import { Router } from 'express';
import { DoctorRoutes, MedicalExaminationRoutes, MedicalExaminationTypeRoutes, MedicalPatientRoutes } from './features';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/doctors', DoctorRoutes.routes);
    router.use('/medical-patients', MedicalPatientRoutes.routes);
    router.use('/medical-examinations', MedicalExaminationRoutes.routes);
    router.use('/medical-examination-types', MedicalExaminationTypeRoutes.routes);

    return router;
  }
}
