import { Router } from 'express';
import { PlannerHiringController } from './controller';
import { PlannerHiringDatasourceImpl, PlannerHiringRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerHiringRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerHiring = new PlannerHiringDatasourceImpl();
    const repositoryPlannerHiring = new PlannerHiringRepositoryImpl(datasourcePlannerHiring);
    const controller = new PlannerHiringController(repositoryPlannerHiring);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post('/', [authMiddleware.validateJWT], controller.createPlannerHiring);
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerHiringById);

    return router;
  }
}
