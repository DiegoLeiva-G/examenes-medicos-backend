import { type NextFunction, type Request, type Response } from 'express';
import { AppError, type ErrorResponse, HttpCode } from '../../../../core';

export class ErrorMiddleware {
  //* Dependency injection
  // constructor() {}

  public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
    if (error instanceof AppError) {
      const { message, name, statusCode, validationErrors } = error;

      res.statusCode = statusCode || HttpCode.INTERNAL_SERVER_ERROR;
      res.json({ error: { name, message, validationErrors, statusCode } });
    } else {
      const name = 'InternalServerError';
      const message = 'An internal server error occurred';

      res.statusCode = HttpCode.INTERNAL_SERVER_ERROR;
      res.json({ error: { name, message, statusCode: HttpCode.INTERNAL_SERVER_ERROR } });
    }
    next();
  };
}
