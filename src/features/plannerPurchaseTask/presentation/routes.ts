import { Router } from 'express';
import { PlannerPurchaseTaskController } from './controller';
import { PlannerPurchaseTaskDatasourceImpl, PlannerPurchaseTaskRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerPurchaseTaskRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerPurchaseTask = new PlannerPurchaseTaskDatasourceImpl();
    const repositoryPlannerPurchaseTask = new PlannerPurchaseTaskRepositoryImpl(datasourcePlannerPurchaseTask);
    const controller = new PlannerPurchaseTaskController(repositoryPlannerPurchaseTask);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAllByPlannerPurchaseId);
    router.get('/:id', [authMiddleware.validateJWT], controller.getById);
    router.post('/', [authMiddleware.validateJWT], controller.create);
    router.put('/:id', [authMiddleware.validateJWT], controller.update);
    router.delete('/:id', [authMiddleware.validateJWT], controller.delete);

    return router;
  }
}
