import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, { type Router, type Request, type Response, type NextFunction } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { HttpCode, AppError, envs } from './core';
import { CustomMiddlewares, ErrorMiddleware } from './features';

interface ServerOptions {
  port: number;
  routes: Router;
  apiPrefix: string;
}

export class Server {
  public readonly app = express(); // This is public for testing purposes
  private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;

  constructor(options: ServerOptions) {
    const { port, routes, apiPrefix } = options;
    this.port = port;
    this.routes = routes;
    this.apiPrefix = apiPrefix;
  }

  async start(): Promise<void> {
    //* Middlewares
    this.app.use(express.json()); // parse json in request body (allow raw)
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
    this.app.use(compression());
    //  limit repeated requests to public APIs

    // TODO: add validation env dev without limit
    if (envs.NODE_ENV !== 'development') {
      this.app.use(
        rateLimit({
          limit: 10000, // 100
          windowMs: 60 * 60 * 1000, // 1 hour
          message: 'Too many requests from this IP, please try again in one hour',
        }),
      );
    }

    // Shared Middlewares
    this.app.use(CustomMiddlewares.writeInConsole);

    // CORS
    this.app.use((req, res, next) => {
      // Add your origins
      const allowedOrigins = envs.CLIENTS_BASE_URL;
      const origin = req.headers.origin;

      if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }

      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    //* Routes
    this.app.use(this.apiPrefix, this.routes);

    // Test rest api
    this.app.get('/', (req: Request, res: Response) => {
      return res.status(HttpCode.OK).send({
        message: `Welcome to Initial API! \n Endpoints available at ${req.protocol}://${req.get('host')}${req.originalUrl}`,
      });
    });

    //* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
    this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
      next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
    });

    // Handle errors middleware
    this.routes.use(ErrorMiddleware.handleError);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}...`);
    });
  }

  close(): void {
    this.serverListener?.close();
  }
}
