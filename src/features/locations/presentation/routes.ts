import { Router } from 'express';
import { LocationController } from './controller';
import { LocationDatasourceImpl, LocationRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class LocationRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceLocation = new LocationDatasourceImpl();
    const repositoryLocation = new LocationRepositoryImpl(datasourceLocation);
    const controller = new LocationController(repositoryLocation);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/states', [authMiddleware.validateJWT], controller.getStatesToSelect);
    router.get('/states/:id', [authMiddleware.validateJWT], controller.getStateById);
    router.get('/sub-states', [authMiddleware.validateJWT], controller.getSubStatesByStateIdToSelect);

    return router;
  }
}
