import 'reflect-metadata';
import serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../../src/app.module';

let cachedHandler: any;

async function bootstrap() {
  if (cachedHandler) return cachedHandler;
  // strip surrounding quotes if Netlify env was set with quotes
  for (const k of ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'CORS_ORIGIN']) {
    if (process.env[k]?.startsWith('"') && process.env[k]?.endsWith('"')) {
      process.env[k] = process.env[k]!.slice(1, -1);
    }
    if (process.env[k]?.startsWith("'") && process.env[k]?.endsWith("'")) {
      process.env[k] = process.env[k]!.slice(1, -1);
    }
  }
  console.log('[netlify] bootstrap start, env check DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('[netlify] env JWT_SECRET exists:', !!process.env.JWT_SECRET, 'CORS_ORIGIN:', process.env.CORS_ORIGIN || 'default');
  if (!process.env.DATABASE_URL) {
    console.error('[netlify] DATABASE_URL missing! Set env in Netlify dashboard scope All (Build+Functions+Runtime) without quotes');
    throw new Error('DATABASE_URL missing - set env var in Netlify without quotes');
  }
  if (!process.env.DATABASE_URL.startsWith('postgresql://') && !process.env.DATABASE_URL.startsWith('postgres://')) {
    console.error('[netlify] DATABASE_URL invalid prefix:', process.env.DATABASE_URL.substring(0, 30));
    throw new Error('DATABASE_URL must start with postgresql://');
  }
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
  try {
    const server = await bootstrap();
    return await server(event, context);
  } catch (err) {
    console.error('[netlify] handler error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Function error', error: String(err) }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
