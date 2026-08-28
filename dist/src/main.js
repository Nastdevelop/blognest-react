"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
        : ['http://localhost:5173', 'http://localhost:3000'];
    app.enableCors({
        origin: (origin, cb) => {
            if (!origin)
                return cb(null, true);
            const allowed = corsOrigins.some((o) => {
                if (o.includes('*')) {
                    const re = new RegExp('^' + o.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                    return re.test(origin);
                }
                return o === origin;
            });
            if (!origin || allowed)
                cb(null, true);
            else
                cb(new Error('Not allowed by CORS'), false);
        },
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Blog API')
        .setDescription('Simple blog CRUD — NestJS + Prisma + JWT. Belajar standar.')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth')
        .addTag('posts')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, doc);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`API running on http://localhost:${port}/api`);
    console.log(`Docs running on http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map