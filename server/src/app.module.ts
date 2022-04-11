import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [AuthModule, PostModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
