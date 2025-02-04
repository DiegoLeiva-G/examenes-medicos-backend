import { Router } from 'express';
import { ProcessYearController } from './controller';
import { ProcessYearDatasourceImpl, ProcessYearRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class ProcessYearRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceProcessYear = new ProcessYearDatasourceImpl();
    const repositoryProcessYear = new ProcessYearRepositoryImpl(datasourceProcessYear);
    const controller = new ProcessYearController(repositoryProcessYear);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);

    return router;
  }
}
