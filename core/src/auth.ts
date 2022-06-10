import { UserDto } from './interface';
import serverProxy from './server-proxy';

export default class Auth {
    apiName: string = 'auth';

    async register(userData: Partial<UserDto>) {
        const response = await serverProxy.post(`${this.apiName}/register`, { ...userData });
        return response.data;
    }

    async signIn(email: string, password: string) {
        const response = await serverProxy.post(`${this.apiName}/signIn`, { email, password });
        return response.data;
    }
}
