import { Router } from 'express';
import { FundingSourceController } from './controller';
import { FundingSourceDatasourceImpl, FundingSourceRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class FundingSourceRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceFundingSource = new FundingSourceDatasourceImpl();
    const repositoryFundingSource = new FundingSourceRepositoryImpl(datasourceFundingSource);
    const controller = new FundingSourceController(repositoryFundingSource);

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
