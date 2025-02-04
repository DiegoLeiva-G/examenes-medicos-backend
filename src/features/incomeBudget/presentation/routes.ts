import { Router } from 'express';
import { IncomeBudgetController } from './controller';
import { IncomeBudgetDatasourceImpl, IncomeBudgetRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class IncomeBudgetRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceIncomeBudget = new IncomeBudgetDatasourceImpl();
    const repositoryIncomeBudget = new IncomeBudgetRepositoryImpl(datasourceIncomeBudget);
    const controller = new IncomeBudgetController(repositoryIncomeBudget);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/detail', [authMiddleware.validateJWT], controller.getAllIncomeBudgetDetailsByIncomeBudgetId);
    router.get('/detail/:id', [authMiddleware.validateJWT], controller.getIncomeBudgetDetailById);
    router.post('/detail', [authMiddleware.validateJWT], controller.createIncomeBudgetDetail);
    router.put('/detail/:id', [authMiddleware.validateJWT], controller.updateIncomeBudgetDetail);
    router.delete('/detail/:id', [authMiddleware.validateJWT], controller.deleteIncomeBudgetDetail);
    router.get('/', [authMiddleware.validateJWT], controller.getAllIncomeBudgets);
    router.post('/', [authMiddleware.validateJWT], controller.createIncomeBudget);
    router.get('/:id', [authMiddleware.validateJWT], controller.getIncomeBudgetById);

    return router;
  }
}
