import Axios from 'axios';
import changeCase from 'change-object-case';
import { ServerError } from './exceptions';

const isDebug = process.env.NODE_ENV !== 'production';

function generateError(errorData: any) {
    if (errorData.response) {
        const message = `${errorData.message}. ${JSON.stringify(errorData.response.data) || ''}.`;
        return new ServerError(message, errorData.response.status);
    }

    const message = `${errorData.message}.`;
    return new ServerError(message, 0);
}

const serverProxy = Axios.create({
    baseURL: `${process.env.API_ENDPOINT}/api`,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
});

serverProxy.interceptors.request.use((config) => config, (error) => {
    if (isDebug) {
        console.log(error);
    }
});

serverProxy.interceptors.response.use((response) => {
    if (response.data instanceof Array) {
        response.data = changeCase.camelArray(
            response.data,
            { recursive: true, arrayRecursive: true }
        );
    } else {
        response.data = changeCase.camelKeys(
            response.data,
            { recursive: true, arrayRecursive: true }
        );
    }

    return response;
}, (error) => {
    throw generateError(error);
});

export default serverProxy;
export { generateError };
