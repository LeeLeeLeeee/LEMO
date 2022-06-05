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
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostModel } from '@prisma/client';
import { CursorDto } from 'app.dto';
import { Public } from 'decorator';
import { editFileName, imageFileFilter } from 'lib/file';
import { diskStorage } from 'multer';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { PostService } from './post.service';

interface PostModelWithCursor {
    posts: PostModel[];
    cursor: number;
}

@Controller('post')
@ApiTags('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get('/feed')
    @UsePipes(new ValidationPipe({ transform: true }))
    @Public()
    async getPublishedPosts(
        @Query() feedProps: CursorDto,
    ): Promise<PostModelWithCursor> {
        const { cursor = -1, pageSize } = feedProps;

        const options: any = {
            where: { published: true },
            orderBy: { id: 'desc' },
            take: +pageSize,
        };
        if (+cursor !== -1) {
            options['cursor'] = { id: +cursor };
            options['skip'] = 1;
        }

        const posts = await this.postService.posts(options);
        if (posts.length === 0) {
            return {
                posts: [],
                cursor,
            };
        }
        return {
            posts,
            cursor: posts[posts.length - 1].id,
        };
    }

    @Get('/:id')
    @Public()
    async getPostById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostModel> {
        return this.postService.post({ id });
    }

    @Get('filter/:searchString')
    @Public()
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
        @Body() resBody: UpdatePostDto,
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
