import { Router } from 'express';
import { EmployeeController } from './controller';
import { EmployeeDatasourceImpl, EmployeeRepositoryImpl } from '../infrastructure';
import { PersonDatasourceImpl, PersonRepositoryImpl } from '../../person';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class EmployeeRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceEmployee = new EmployeeDatasourceImpl();
    const datasourcePerson = new PersonDatasourceImpl();
    const repositoryEmployee = new EmployeeRepositoryImpl(datasourceEmployee);
    const repositoryPerson = new PersonRepositoryImpl(datasourcePerson);
    const controller = new EmployeeController(repositoryEmployee, repositoryPerson);

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
