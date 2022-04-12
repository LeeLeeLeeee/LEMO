import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from 'interfaces';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/feed')
    async getPublishedPosts(): Promise<PostModel[]> {
        return this.postService.posts({
            where: { published: true },
        });
    }

    @Get('/:id')
    async getPostById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostModel> {
        return this.postService.post({ id });
    }

    @Get('fileter/:searchString')
    async getFilteredPosts(
        @Param('searchString') searchString: string,
    ): Promise<PostModel[]> {
        return this.postService.posts({
            where: {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post()
    async createDraft(@Body() postData: CreatePostDto): Promise<PostModel> {
        const { title, content, email } = postData;
        return this.postService.createPost({
            title,
            content,
            author: {
                connect: { email },
            },
        });
    }

    @Put('/:id')
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() resBody: Omit<PostModel, 'id' | 'authorId'>,
    ): Promise<PostModel> {
        return this.postService.updatePost({
            where: { id },
            data: { ...resBody },
        });
    }

    @Put('publish/:id')
    async publishPost(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostModel> {
        return this.postService.updatePost({
            where: { id },
            data: { published: true },
        });
    }

    @Delete('/:id')
    async deletePostById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostModel> {
        return this.postService.deletePost({ id });
    }
}
