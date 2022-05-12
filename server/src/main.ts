declare const module: any;

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from 'prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
