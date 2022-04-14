import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post as PostDto } from 'server-module/node_modules/@prisma/client';

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
        apiName: string
    }
};

export type { PostDto };
