import { Router } from 'express';
import { UserController } from './controller';
import { UserDatasourceImpl, UserRepositoryImpl } from '../infrastructure';
import { AuthMiddleware } from '../../auth';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasource = new UserDatasourceImpl();
    const repository = new UserRepositoryImpl(datasource);
    const controller = new UserController(repository);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);
    router.get('/root', [authMiddleware.validateJWT], controller.getAllRoot);
    router.get('/:id', [authMiddleware.validateJWT], controller.getById);
    router.post('/clave-unica', [authMiddleware.validateJWT], controller.createCUUser);
    router.post('/local-user', [authMiddleware.validateJWT], controller.createLocalUser);
    router.post('/local-root-user', [authMiddleware.validateJWT], controller.createLocalRootUser);
    router.put('/:id/clave-unica', [authMiddleware.validateJWT], controller.updateUserWithCU);
    router.put('/:id/local-user', [authMiddleware.validateJWT], controller.updateLocalUser);
    router.put('/:id/local-root-user', [authMiddleware.validateJWT], controller.updateLocalRootUser);
    router.delete('/:id', [authMiddleware.validateJWT], controller.delete);

    return router;
  }
}
