import { Router } from 'express';
import { PlannerCouncilorSalaryController } from './controller';
import { PlannerCouncilorSalaryDatasourceImpl, PlannerCouncilorSalaryRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';

export class PlannerCouncilorSalaryRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourcePlannerCouncilorSalary = new PlannerCouncilorSalaryDatasourceImpl();
    const repositoryPlannerCouncilorSalary = new PlannerCouncilorSalaryRepositoryImpl(datasourcePlannerCouncilorSalary);
    const controller = new PlannerCouncilorSalaryController(repositoryPlannerCouncilorSalary);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.post('/', [authMiddleware.validateJWT], controller.createPlannerCouncilorSalary);
    router.get('/:id', [authMiddleware.validateJWT], controller.getPlannerCouncilorSalaryById);

    return router;
  }
}
