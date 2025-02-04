import { Router } from 'express';
import { DirectorateController } from './controller';
import { DirectorateDatasourceImpl, DirectorateRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class DirectorateRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceDirectorate = new DirectorateDatasourceImpl();
    const repositoryDirectorate = new DirectorateRepositoryImpl(datasourceDirectorate);
    const controller = new DirectorateController(repositoryDirectorate);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);
    router.get('/with-departments', [authMiddleware.validateJWT], controller.getAllWithDepartments);

    return router;
  }
}
