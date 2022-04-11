import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'prisma.service';

@Module({
    providers: [PostService, PrismaService],
    exports: [PostService],
    controllers: [PostController],
})
export class PostModule {}
