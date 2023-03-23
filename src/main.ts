import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{});
  app.useStaticAssets(path.join(__dirname, '..', 'upload'));
  await app.listen(3000);
}
bootstrap();
