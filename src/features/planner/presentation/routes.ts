import { Router } from 'express';
import { PlannerController } from './controller';
import { PlannerDatasourceImpl, PlannerRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';
import { InvestmentInitiativeDatasourceImpl, InvestmentInitiativeRepositoryImpl } from '../../investmentInitiative';
import { ImprovementProjectDatasourceImpl, ImprovementProjectRepositoryImpl } from '../../improvementProject';

export class PlannerRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlanner = new PlannerDatasourceImpl();
    const repositoryPlanner = new PlannerRepositoryImpl(datasourcePlanner);
    const datasourceInvestmentInitiative = new InvestmentInitiativeDatasourceImpl();
    const repositoryInvestmentInitiative = new InvestmentInitiativeRepositoryImpl(datasourceInvestmentInitiative);
    const datasourceImprovementProject = new ImprovementProjectDatasourceImpl();
    const repositoryImprovementProject = new ImprovementProjectRepositoryImpl(datasourceImprovementProject);
    const controller = new PlannerController(
      repositoryPlanner,
      repositoryInvestmentInitiative,
      repositoryImprovementProject,
    );

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get(
      '/investment-initiative',
      [authMiddleware.validateJWT],
      controller.getAllPlannersByInvestmentInitiativeId,
    );
    router.post('/investment-initiative', [authMiddleware.validateJWT], controller.createPlannerToInvestmentInitiative);
    router.get('/improvement-project', [authMiddleware.validateJWT], controller.getAllPlannersByImprovementProjectId);
    router.post('/improvement-project', [authMiddleware.validateJWT], controller.createPlannerToImprovementProject);
    router.put('/:id', [authMiddleware.validateJWT], controller.updatePlanner);
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerById);
    return router;
  }
}
