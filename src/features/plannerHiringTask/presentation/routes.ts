import { Router } from 'express';
import { PlannerHiringTaskController } from './controller';
import { PlannerHiringTaskDatasourceImpl, PlannerHiringTaskRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';
// TODO: add missing values
export class PlannerHiringTaskRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerHiringTask = new PlannerHiringTaskDatasourceImpl();
    const repositoryPlannerHiringTask = new PlannerHiringTaskRepositoryImpl(datasourcePlannerHiringTask);
    const controller = new PlannerHiringTaskController(repositoryPlannerHiringTask);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAllByPlannerHiringId);
    router.get('/:id', [authMiddleware.validateJWT], controller.getById);
    router.post('/', [authMiddleware.validateJWT], controller.create);
    router.put('/:id', [authMiddleware.validateJWT], controller.update);
    router.delete('/:id', [authMiddleware.validateJWT], controller.delete);

    return router;
  }
}
