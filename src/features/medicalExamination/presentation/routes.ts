import { Router } from 'express';
import { MedicalExaminationController } from './controller';
import { MedicalExaminationDatasourceImpl, MedicalExaminationRepositoryImpl } from '../infrastructure';

export class MedicalExaminationRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceMedicalExamination = new MedicalExaminationDatasourceImpl();
    const repositoryMedicalExamination = new MedicalExaminationRepositoryImpl(datasourceMedicalExamination);
    const controller = new MedicalExaminationController(repositoryMedicalExamination);

    router.get('/', controller.getAllMedicalExaminations);
    router.get('/:id', controller.getMedicalExaminationById);
    router.delete('/:id', controller.deleteMedicalExamination);
    router.post('/', controller.createMedicalExamination);
    router.put('/:id', controller.updateMedicalExamination);

    return router;
  }
}
