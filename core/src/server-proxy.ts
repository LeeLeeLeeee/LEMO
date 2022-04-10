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
});

serverProxy.interceptors.request.use((config) => config, (error) => {
    if (isDebug) {
        console.log(error);
    }
});
