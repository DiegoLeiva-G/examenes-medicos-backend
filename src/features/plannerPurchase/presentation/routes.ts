import { Router } from 'express';
import { PlannerPurchaseController } from './controller';
import { PlannerPurchaseDatasourceImpl, PlannerPurchaseRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerPurchaseRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerPurchase = new PlannerPurchaseDatasourceImpl();
    const repositoryPlannerPurchase = new PlannerPurchaseRepositoryImpl(datasourcePlannerPurchase);
    const controller = new PlannerPurchaseController(repositoryPlannerPurchase);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post('/', [authMiddleware.validateJWT], controller.createPlannerPurchase);
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerPurchaseById);

    return router;
  }
}
