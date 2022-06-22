import { UserDto } from 'interface';
import serverProxy from './server-proxy';

type UpdateUserDto = Partial<Omit<UserDto, 'id' | 'email'>>;

export default class User {
    apiName: string = 'user';

    async getSelf() {
        const response = await serverProxy.get(`${this.apiName}/self`);
        return response.data;
    }

    async update(id: number, userInfo: UpdateUserDto) {
        const response = await serverProxy.put(`${this.apiName}/${id}`, { ...userInfo });
        return response.data;
    }
}
