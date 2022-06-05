declare const module: any;

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from 'prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const config = new DocumentBuilder()
        .setTitle('Lemo swagger')
        .setDescription('The Lemo API description')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('post')
        .addTag('email')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
