import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { MainAppModule } from './main-app.module';

const TAG = 'MainHandler';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(MainAppModule, adapter, {
    cors: true,
  });

  console.log(TAG, 'start-bootstrap');

  await nestApp.init();
  return createServer(expressApp);
}

const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.assert(!cachedServer, TAG, 'cached-server');

  cachedServer = cachedServer ?? (await bootstrap());
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

export const MainHandler: Handler = handler;
