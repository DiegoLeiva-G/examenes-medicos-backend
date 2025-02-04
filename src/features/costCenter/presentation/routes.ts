import { Router } from 'express';
import { CostCenterController } from './controller';
import { CostCenterDatasourceImpl, CostCenterRepositoryImpl } from '../infrastructure';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../user';
import { AuthMiddleware } from '../../auth';
import { ManagementAreaDatasourceImpl, ManagementAreaRepositoryImpl } from '../../managementArea';
import { DirectorateDatasourceImpl, DirectorateRepositoryImpl } from '../../directorate';

export class CostCenterRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasourceCostCenter = new CostCenterDatasourceImpl();
    const repositoryCostCenter = new CostCenterRepositoryImpl(datasourceCostCenter);
    const datasourceManagementArea = new ManagementAreaDatasourceImpl();
    const repositoryManagementArea = new ManagementAreaRepositoryImpl(datasourceManagementArea);
    const datasourceDirectorate = new DirectorateDatasourceImpl();
    const repositoryDirectorate = new DirectorateRepositoryImpl(datasourceDirectorate);
    const controller = new CostCenterController(repositoryCostCenter, repositoryManagementArea, repositoryDirectorate);

    // * Authentication middleware
    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authMiddleware = new AuthMiddleware(userRepository);

    router.get('/', [authMiddleware.validateJWT], controller.getAll);
    router.get(
      '/by-management-area-and-directorate',
      [authMiddleware.validateJWT],
      controller.getAllByManagementAreaAndDirectorate,
    );

    return router;
  }
}
