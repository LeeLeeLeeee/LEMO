import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from 'interfaces';
import { editFileName, imageFileFilter } from 'lib/file';
import { diskStorage } from 'multer';
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

    @Get('filter/:searchString')
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
        const { title, content, email, thumbnailLink } = postData;
        return this.postService.createPost({
            title,
            content,
            thumbnailLink,
            author: {
                connect: { email },
            },
        });
    }

    /* TODO: 추후 CDN으로 변경 */
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './upload',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadFile(
        @Body() _: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file?.filename) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: '이미지 저장 실패',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return {
            originalName: file.originalname,
            filename: file.filename,
        };
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
