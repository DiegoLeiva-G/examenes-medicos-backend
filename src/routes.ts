import { Router } from 'express';
import {
  AccountPlanRoutes,
  AuthRoutes,
  CostCenterRoutes,
  EmployeeRoutes,
  LocationRoutes,
  ManagementAreaRoutes,
  PladecoRoutes,
  UserRoutes,
  DirectorateRoutes,
  MeasureUnitRoutes,
  DepartmentRoutes,
  FundingSourceRoutes,
  InvestmentInitiativeRoutes,
  ImprovementProjectRoutes,
  IncomeBudgetRoutes,
  ProcessYearRoutes,
  PlannerRoutes,
  PlannerPurchaseRoutes,
  PlannerPurchaseTaskRoutes,
  PlannerHiringRoutes,
  PlannerHiringTaskRoutes,
  PlannerSubsidyRoutes,
  PlannerSubsidyTaskRoutes,
  PlannerSpecialHiringRoutes,
  PlannerCouncilorSalaryRoutes,
} from './features';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/auth', AuthRoutes.routes);
    router.use('/users', UserRoutes.routes);
    router.use('/employees', EmployeeRoutes.routes);
    router.use('/locations', LocationRoutes.routes);
    router.use('/measure-units', MeasureUnitRoutes.routes);
    router.use('/management-areas', ManagementAreaRoutes.routes);
    router.use('/cost-centers', CostCenterRoutes.routes);
    router.use('/directorates', DirectorateRoutes.routes);
    router.use('/accounts-plan', AccountPlanRoutes.routes);
    router.use('/pladeco', PladecoRoutes.routes);
    router.use('/departments', DepartmentRoutes.routes);
    router.use('/funding-sources', FundingSourceRoutes.routes);
    router.use('/investment-initiatives', InvestmentInitiativeRoutes.routes);
    router.use('/improvement-projects', ImprovementProjectRoutes.routes);
    router.use('/income-budgets', IncomeBudgetRoutes.routes);
    router.use('/process-years', ProcessYearRoutes.routes);
    router.use('/planners', PlannerRoutes.routes);
    router.use('/planner-purchases', PlannerPurchaseRoutes.routes);
    router.use('/planner-purchase-tasks', PlannerPurchaseTaskRoutes.routes);
    router.use('/planner-hiring', PlannerHiringRoutes.routes);
    router.use('/planner-hiring-tasks', PlannerHiringTaskRoutes.routes);
    router.use('/planner-subsidies', PlannerSubsidyRoutes.routes);
    router.use('/planner-subsidy-tasks', PlannerSubsidyTaskRoutes.routes);
    router.use('/planner-special-hiring', PlannerSpecialHiringRoutes.routes);
    router.use('/planner-councilor-salary', PlannerCouncilorSalaryRoutes.routes);

    // rest of routes
    // ...

    return router;
  }
}
