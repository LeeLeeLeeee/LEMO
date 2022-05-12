import { Post as PostModel, User as UserModel } from '@prisma/client';

export type CreateUserDto = Pick<UserModel, 'email' | 'password' | 'name'>;

export type CreatePostDto = Pick<
    PostModel,
    'title' | 'content' | 'thumbnailLink'
> &
    Pick<UserModel, 'email'>;

export type UpdatePostDto = Pick<
    PostModel,
    'title' | 'content' | 'thumbnailLink'
>;
