import { Router } from 'express';
import { PlannerSpecialHiringController } from './controller';
import { PlannerSpecialHiringDatasourceImpl, PlannerSpecialHiringRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerSpecialHiringRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerSpecialHiring = new PlannerSpecialHiringDatasourceImpl();
    const repositoryPlannerSpecialHiring = new PlannerSpecialHiringRepositoryImpl(datasourcePlannerSpecialHiring);
    const controller = new PlannerSpecialHiringController(repositoryPlannerSpecialHiring);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post('/', [authMiddleware.validateJWT], controller.requestPlannerSpecialHiring);
    router.get(
      '/investment-initiative',
      [authMiddleware.validateJWT],
      controller.getAllPlannerSpecialHiringRequestInvestmentInitiative,
    );
    router.get(
      '/improvement-project',
      [authMiddleware.validateJWT],
      controller.getAllPlannerSpecialHiringRequestImprovementProject,
    );
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerSpecialHiringById);
    router.get(
      '/:id/investment-initiative',
      [authMiddleware.validateJWT],
      controller.getPlannerSpecialHiringRequestDetailInvestmentInitiativeById,
    );
    router.get(
      '/:id/improvement-project',
      [authMiddleware.validateJWT],
      controller.getPlannerSpecialHiringRequestDetailImprovementProjectById,
    );
    router.post('/:id/determinate', [authMiddleware.validateJWT], controller.determinatePlannerSpecialHiring);

    return router;
  }
}
