import { Router } from 'express';
import { PlannerSubsidyTaskController } from './controller';
import { PlannerSubsidyTaskDatasourceImpl, PlannerSubsidyTaskRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerSubsidyTaskRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerSubsidyTask = new PlannerSubsidyTaskDatasourceImpl();
    const repositoryPlannerSubsidyTask = new PlannerSubsidyTaskRepositoryImpl(datasourcePlannerSubsidyTask);
    const controller = new PlannerSubsidyTaskController(repositoryPlannerSubsidyTask);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAllByPlannerSubsidyId);
    router.get('/:id', [authMiddleware.validateJWT], controller.getById);
    router.post('/', [authMiddleware.validateJWT], controller.create);
    router.put('/:id', [authMiddleware.validateJWT], controller.update);
    router.delete('/:id', [authMiddleware.validateJWT], controller.delete);

    return router;
  }
}
