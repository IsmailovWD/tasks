import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  server.use(express.static(join(__dirname, '..', 'dist')));

  server.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'dist', 'index.html'));
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
