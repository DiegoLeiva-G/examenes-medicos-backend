import { type NextFunction, type Request, type Response } from 'express';
import { type SuccessResponse } from '../../../core';
import { GetProcessYears, type ProcessYearEntity, type ProcessYearRepository } from '../domain';

export class ProcessYearController {
  //* Dependency injection
  constructor(private readonly employeeRepository: ProcessYearRepository) {}

  public getAll = (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response<SuccessResponse<ProcessYearEntity[]>>,
    next: NextFunction,
  ): void => {
    new GetProcessYears(this.employeeRepository)
      .execute()
      .then(result => res.json({ data: result }))
      .catch(error => {
        next(error);
      });
  };
}
