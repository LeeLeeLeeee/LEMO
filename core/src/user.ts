import serverProxy from './server-proxy';

export default class User {
    apiName: string = 'user';

    async getSelf() {
        const response = await serverProxy.get(`${this.apiName}/self`);
        return response.data;
    }
}
