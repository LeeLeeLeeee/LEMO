import Axios from 'axios';
import changeCase from 'change-object-case';

const isDebug = process.env.NODE_ENV !== 'production';

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
    if (isDebug) {
        console.log(error);
    }
});

export default serverProxy;
