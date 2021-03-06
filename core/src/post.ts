import { ApiHandler, FileUploadType } from 'interface';
import { Post as PostDto } from 'server-module/node_modules/@prisma/client';
import serverProxy from './server-proxy';

export default class Post implements ApiHandler<PostDto> {
    apiName: string = 'post';

    async create(data: Partial<PostDto>) {
        const response = await serverProxy.post<PostDto>(this.apiName, {
            ...data
        });
        return response;
    }

    async update(id: number, data: Partial<PostDto>) {
        const response = await serverProxy.put<PostDto>(`${this.apiName}/${id}`, {
            ...data
        });
        return response;
    }

    async delete(id: number) {
        const response = await serverProxy.delete<PostDto>(`${this.apiName}/${id}`);
        return response;
    }

    async getList(option: Partial<PostDto>) {
        const response = await serverProxy.get<PostDto[]>(`${this.apiName}/filter`, {
            data: option,
        });
        return response;
    }

    async getFeeds(pageSize: number, cursor: number, authorID?: number) {
        const response = await serverProxy.get<{ posts: PostDto[], cursor: number }>(`${this.apiName}/feed`, {
            params: {
                cursor,
                pageSize,
                authorID,
            },
        });
        return response.data;
    }

    async getById(id: number) {
        const response = await serverProxy.get<PostDto>(`${this.apiName}/${id}`);
        return response;
    }

    async uploadImage(image: File, defaultFileName?: string) {
        const formData = new FormData();
        formData.append('image', image, defaultFileName);
        const response = await serverProxy.post<FileUploadType>(`${this.apiName}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    }
}
