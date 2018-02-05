import * as express from "express";
import * as bodyParser from "body-parser";
import mydbm from "./managers/db.manager";
// @@ routers

import loginRoute from './routers/login.route';
import monitoringRoute from './routers/monitor.route';

class App {
  public app: express.Application;
  private readonly PORT: number = 3000;

  constructor() {
    this.init();
  }

  private init(): void {
    this.app = express();

    this.registerParser();
    this.setHeaders();
    this.setRouters();
    this.startServer();
    this.initDatabase();
  }

  private registerParser(): void {
    this.app.use(bodyParser.json({ limit: '25mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
  }

  private initDatabase(): void {
    // create db
    mydbm.createDB();
  }

  private setHeaders(): void {

    this.app.use((req, res, next) => {
      const allowedOrigins = ['http://localhost:4200/'];
      const origin = req.headers.origin;
      if (origin && allowedOrigins.indexOf(origin.toString()) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

  }

  private setRouters(): void {
    // @@ Register the routers to the express instance
    this.app.use('/login' , loginRoute);
    this.app.use('/monitor' , monitoringRoute);

  }

  private startServer(): void {
    // Start the server
    this.app.listen(this.PORT, () => console.log('Server listening on port ' + this.PORT + '!'));
  }
}

/**
 * App initialization
 */
new App();
