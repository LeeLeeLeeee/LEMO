import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/:id')
    async getPostById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostModel> {
        return this.postService.post({ id });
    }
}
