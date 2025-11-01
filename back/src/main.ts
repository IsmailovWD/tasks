import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/', express.static(join(__dirname, '..', 'public')));
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
