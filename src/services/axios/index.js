import axios from 'axios';
import store from 'store';
import { notification } from 'antd';
import qs, { parse } from 'qs';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/',
    cancelToken: axios.CancelToken.source().token,

    paramsSerializer: {
        encode: parse,
        serialize: (params) => JSON.stringify(params, { skipNulls: true, arrayFormat: 'repeat' }),
    },
});


apiClient.interceptors.request.use((request) => {
    const accessToken = store.get('access_token');

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
        request.headers.accessToken = accessToken;
    }
    return request;
});

apiClient.interceptors.response.use((undefined, error) => {
    try {
        const { response } = error;
        const { data } = response;
        if (data) {
            notification.error({
                message: 'Error',
                description: data?.message || 'Something went wrong. Please try again',
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'Something went wrong. Please try again',
        });
    }
});

export default apiClient;
