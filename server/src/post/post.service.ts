import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async post(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    ): Promise<Post | null> {
        let posts = null;
        try {
            posts = await this.prisma.post.findUnique({
                where: postWhereUniqueInput,
            });
        } catch (error) {
            throw new HttpException(
                'error for get the post list',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return posts;
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params;
        let posts = null;
        try {
            posts = await this.prisma.post.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
        } catch (error) {
            throw new HttpException(
                'error for get the post list',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return posts;
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        let post = null;
        try {
            post = this.prisma.post.create({
                data,
            });
        } catch (error) {
            throw new HttpException(
                'error for create a post',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return post;
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const { data, where } = params;
        let post = null;
        try {
            post = this.prisma.post.update({
                data,
                where,
            });
        } catch (error) {
            throw new HttpException(
                'error for update a post',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return post;
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }

    async deletePostMany(where: Prisma.PostWhereInput) {
        let count = null;
        try {
            count = await this.prisma.post.deleteMany({
                where,
            });
        } catch (error) {
            throw new HttpException(
                'error for delete the post list',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return count;
    }
}
