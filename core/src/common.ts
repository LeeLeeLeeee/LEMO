import serverProxy from './server-proxy';

export default class Common {
    async getImageByName(fileName: string): Promise<string> {
        const response = await serverProxy.get(`/static/${fileName}`, { baseURL: process.env.API_ENDPOINT, responseType: 'blob' });
        const url = window.URL || window.webkitURL;
        const imgURL = url.createObjectURL(response.request.response);
        return imgURL;
    }
}
