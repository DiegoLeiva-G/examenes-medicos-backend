import { Router } from 'express';
import { AccountPlanController } from './controller';
import { AccountPlanDatasourceImpl, AccountPlanRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class AccountPlanRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceAccountPlan = new AccountPlanDatasourceImpl();
    const repositoryAccountPlan = new AccountPlanRepositoryImpl(datasourceAccountPlan);
    const controller = new AccountPlanController(repositoryAccountPlan);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);
    router.get('/incomes', [authMiddleware.validateJWT], controller.getIncomes);
    router.get('/expenses', [authMiddleware.validateJWT], controller.getExpenses);

    return router;
  }
}
