import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: false,
  });

  app.use('/', express.static(join(__dirname, '..', 'public')));
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`App running on ${process.env.PORT || 3000}`);
}
bootstrap();
