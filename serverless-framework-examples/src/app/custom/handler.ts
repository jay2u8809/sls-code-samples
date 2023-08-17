import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { CustomAppModule } from './custom-app-module';

// refs: https://zenn.dev/saitom_tech/articles/nestjs_on_lambda
const TAG = 'CustomHandler';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(CustomAppModule, adapter, {
    cors: true,
  });

  console.log(TAG, 'start-bootstrap');

  await nestApp.init();
  return createServer(expressApp, null, ['image/jpeg', 'image/png']);
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

export const CustomHandler: Handler = handler;
