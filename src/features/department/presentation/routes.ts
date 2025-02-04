import { Router } from 'express';
import { DepartmentController } from './controller';
import { DepartmentDatasourceImpl, DepartmentRepositoryImpl } from '../infrastructure';

export class DepartmentRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceDepartment = new DepartmentDatasourceImpl();
    const repositoryDepartment = new DepartmentRepositoryImpl(datasourceDepartment);
    const controller = new DepartmentController(repositoryDepartment);

    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
