import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
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

  // Swagger docs
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

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
  console.log(`Docs running on http://localhost:${port}/api/docs`);
}
bootstrap();
