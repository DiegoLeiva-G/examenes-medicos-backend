import { Router } from 'express';
import { MeasureUnitController } from './controller';
import { MeasureUnitDatasourceImpl, MeasureUnitRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class MeasureUnitRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceMeasureUnit = new MeasureUnitDatasourceImpl();
    const repositoryMeasureUnit = new MeasureUnitRepositoryImpl(datasourceMeasureUnit);
    const controller = new MeasureUnitController(repositoryMeasureUnit);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);
    router.get('/:id', [authMiddleware.validateJWT], controller.getById);
    router.post('/', [authMiddleware.validateJWT], controller.create);
    router.put('/:id', [authMiddleware.validateJWT], controller.update);
    router.delete('/:id', [authMiddleware.validateJWT], controller.delete);

    return router;
  }
}
