import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post as PostDto } from 'server-module/node_modules/@prisma/client';
import { CreatePostDto } from 'server-module/src/interfaces';

export interface ApiHandler<T> {
    getList: (option: Partial<T>) => Promise<AxiosResponse<T[], any>>,
    getById: (id: number) => Promise<AxiosResponse<T, any>>,
    create: (data: Partial<T>) => Promise<AxiosResponse<T, any>>,
    update: (id: number, data: Partial<T>) => Promise<AxiosResponse<T, any>>,
    delete: (id: number) => Promise<AxiosResponse<T, any>>,
}

export interface AxiosParamType {
    url: string;
    data?: any;
    config?: AxiosRequestConfig<any> | undefined
}

export type CoreInstanceInterface = {
    post: ApiHandler<PostDto> & {
        apiName: string;
        uploadImage: (file: File) => Promise<{
            originalName: string,
            filename: string
        }>;
    },
    common: {
        getImageByName: (fileName: string) => Promise<string>
    }
};

export type FileUploadType = {
    image: File,
};

export type { PostDto, CreatePostDto };
