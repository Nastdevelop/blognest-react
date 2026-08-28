import 'reflect-metadata';
import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../../src/app.module';

let cachedHandler: any;

async function bootstrap() {
  if (cachedHandler) return cachedHandler;

  const app = await NestFactory.create(AppModule);

  // CORS allow Vercel + local via env CORS_ORIGIN (comma separated) or default
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'https://*.vercel.app'];

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const allowed = corsOrigins.some((o) => {
        if (o.includes('*')) {
          const re = new RegExp('^' + o.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
          return re.test(origin);
        }
        return o === origin;
      });
      cb(null, allowed);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Simple blog CRUD — NestJS + Prisma + JWT. Belajar standar.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('posts')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, doc);

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  cachedHandler = serverless(expressApp);
  return cachedHandler;
}

export const handler = async (event: any, context: any) => {
  const server = await bootstrap();
  return server(event, context);
};
