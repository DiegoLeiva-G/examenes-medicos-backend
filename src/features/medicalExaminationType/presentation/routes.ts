import { Router } from 'express';
import { MedicalExaminationTypeController } from './controller';
import { MedicalExaminationTypeDatasourceImpl, MedicalExaminationTypeRepositoryImpl } from '../infrastructure';

export class MedicalExaminationTypeRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceMedicalExaminationType = new MedicalExaminationTypeDatasourceImpl();
    const repositoryMedicalExaminationType = new MedicalExaminationTypeRepositoryImpl(datasourceMedicalExaminationType);
    const controller = new MedicalExaminationTypeController(repositoryMedicalExaminationType);

    router.get('/', controller.getAllMedicalExaminationTypes);
    router.get('/:id', controller.getMedicalExaminationTypeById);
    router.delete('/:id', controller.deleteMedicalExaminationType);
    router.post('/', controller.createMedicalExaminationType);
    router.put('/:id', controller.updateMedicalExaminationType);

    return router;
  }
}
