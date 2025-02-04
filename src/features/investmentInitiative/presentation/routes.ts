import { Router } from 'express';
import { InvestmentInitiativeController } from './controller';
import { InvestmentInitiativeDatasourceImpl, InvestmentInitiativeRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class InvestmentInitiativeRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceInvestmentInitiative = new InvestmentInitiativeDatasourceImpl();
    const repositoryInvestmentInitiative = new InvestmentInitiativeRepositoryImpl(datasourceInvestmentInitiative);
    const controller = new InvestmentInitiativeController(repositoryInvestmentInitiative);

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
