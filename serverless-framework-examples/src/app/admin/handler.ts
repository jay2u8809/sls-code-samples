import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { AdminAppModule } from './admin-app-module';

// refs: https://zenn.dev/saitom_tech/articles/nestjs_on_lambda
const TAG = 'AdminHandler';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(AdminAppModule, adapter, {
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

export const AdminHandler: Handler = handler;
