import { Router } from 'express';
import { ManagementAreaController } from './controller';
import { ManagementAreaDatasourceImpl, ManagementAreaRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class ManagementAreaRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceManagementArea = new ManagementAreaDatasourceImpl();
    const repositoryManagementArea = new ManagementAreaRepositoryImpl(datasourceManagementArea);
    const controller = new ManagementAreaController(repositoryManagementArea);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);

    return router;
  }
}
