import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as webpack from 'webpack';
import * as path from 'path';
import config from '../webpack.config';
import AccountResource from './api/AccountResource';
require('dotenv').load({ silent: true });

class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware(webpack(config));
    this.routes();
    this.db();
  }

  private middleware(compiler): void {
    this.express.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.express.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../src/client/index.html')));
    this.express.use('/api/v1/accounts', AccountResource);
  }

  private db(): void {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      }),
      databaseURL: 'https://accounts-app-a61e1.firebaseio.com'
    });
  }
}

const port = (process.env.PORT || 3000);
export default new Server().express.listen(port).on('listening', () => {
  console.log(`Server started on port ${port}`);
});
