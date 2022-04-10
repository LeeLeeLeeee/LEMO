import { AxiosResponse } from 'axios';
import serverProxy from 'server-proxy';
import { PostTypes } from './interface';

export default class Post {
    async getList() {
        const response = serverProxy.get<any, AxiosResponse<PostTypes[], any>>('post');
        return response;
    }
}
