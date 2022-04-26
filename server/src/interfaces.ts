import { Post as PostModel, User as UserModel } from '@prisma/client';

export type CreatePostDto = Pick<
    PostModel,
    'title' | 'content' | 'thumbnailLink'
> &
    Pick<UserModel, 'email'>;
