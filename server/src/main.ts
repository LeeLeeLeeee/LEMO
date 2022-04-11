import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3000);
}
bootstrap();
