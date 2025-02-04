import { Router } from 'express';
import { PlannerSubsidyController } from './controller';
import { PlannerSubsidyDatasourceImpl, PlannerSubsidyRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerSubsidyRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerSubsidy = new PlannerSubsidyDatasourceImpl();
    const repositoryPlannerSubsidy = new PlannerSubsidyRepositoryImpl(datasourcePlannerSubsidy);
    const controller = new PlannerSubsidyController(repositoryPlannerSubsidy);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post('/', [authMiddleware.validateJWT], controller.createPlannerSubsidy);
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerSubsidyById);

    return router;
  }
}
