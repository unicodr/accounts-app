import * as express from 'express';
import * as bodyParser from 'body-parser';
import AccountResource from './api/AccountResource';

class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    let router = express.Router();
    this.express.use('/api/v1/accounts', AccountResource);
  }
}

const port = (process.env.PORT || 3000);
export default new Server().express.listen(port).on('listening', () => {
  console.log(`Server started on port ${port}`);
});
