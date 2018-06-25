/* tslint:disable no-console */
let Package = {};
const compression = require('compression');
import { MeteorServer } from './app/api/meteor';
import 'zone.js/dist/zone-node';
import './polyfills.server';
import * as express from 'express';
import * as path from 'path';
import { ServerAppModuleNgFactory } from './app/server.app.module.ngfactory';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { routes } from './server.routes';
import { App } from './mock-api/app';
import { enableProdMode } from '@angular/core';
import { UNIVERSAL_PORT } from '../constants';
enableProdMode();
const app = express();
const api = new App();
const baseUrl = `http://localhost:${UNIVERSAL_PORT}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use(compression());
app.use('/', express.static('dist', { index: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));

routes.forEach(route => {
  app.get('/' + route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(UNIVERSAL_PORT, () => {
  console.log(`Listening at ${baseUrl}`);
});


MeteorServer.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time
  // a server connection is re-established
  if (error) {
    console.log('DDP connection error!');
    return;
  }

  if (wasReconnect) {
    console.log('Reestablishment of a connection.');
  }

  console.log('connected!');

  MeteorServer.subscribe('services');
});
