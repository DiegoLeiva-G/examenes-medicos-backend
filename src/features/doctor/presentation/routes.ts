import { Router } from 'express';
import { DoctorController } from './controller';
import { DoctorDatasourceImpl, DoctorRepositoryImpl } from '../infrastructure';

export class DoctorRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceDoctor = new DoctorDatasourceImpl();
    const repositoryDoctor = new DoctorRepositoryImpl(datasourceDoctor);
    const controller = new DoctorController(repositoryDoctor);

    router.get('/', controller.getAllDoctors);
    router.get('/:id', controller.getDoctorById);
    router.delete('/:id', controller.deleteDoctor);
    router.post('/', controller.createDoctor);
    router.put('/:id', controller.updateDoctor);

    return router;
  }
}
