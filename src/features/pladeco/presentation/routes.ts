import { Router } from 'express';
import { PladecoController } from './controller';
import { PladecoDatasourceImpl, PladecoRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PladecoRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePladeco = new PladecoDatasourceImpl();
    const repositoryPladeco = new PladecoRepositoryImpl(datasourcePladeco);
    const controller = new PladecoController(repositoryPladeco);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/strategics', [authMiddleware.validateJWT], controller.getStrategics);
    router.get('/specifics', [authMiddleware.validateJWT], controller.getSpecifics);

    return router;
  }
}
