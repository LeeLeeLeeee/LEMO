import serverProxy from './server-proxy';

export default class Email {
    apiName: string = 'email';

    async confirm(token: string) {
        const response = await serverProxy.post(`${this.apiName}/email-confirm`, { token });
        return response.data;
    }

    async sendEmail(email: string) {
        const response = await serverProxy.post(`${this.apiName}/send-email`, { recipient: email });
        return response.data;
    }
}
