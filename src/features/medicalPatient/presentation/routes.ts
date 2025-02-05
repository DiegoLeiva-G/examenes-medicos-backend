import { Router } from 'express';
import { MedicalPatientController } from './controller';
import { MedicalPatientDatasourceImpl, MedicalPatientRepositoryImpl } from '../infrastructure';

export class MedicalPatientRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceMedicalPatient = new MedicalPatientDatasourceImpl();
    const repositoryMedicalPatient = new MedicalPatientRepositoryImpl(datasourceMedicalPatient);
    const controller = new MedicalPatientController(repositoryMedicalPatient);

    router.get('/', controller.getAllMedicalPatients);
    router.get('/:id', controller.getMedicalPatientById);
    router.delete('/:id', controller.deleteMedicalPatient);
    router.post('/', controller.createMedicalPatient);
    router.put('/:id', controller.updateMedicalPatient);

    return router;
  }
}
