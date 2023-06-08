import axios from 'axios';
import store from 'store';
import { notification } from 'antd';
import qs, { parse } from 'qs';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    cancelToken: axios.CancelToken.source().token,

    paramsSerializer: {
        encode: parse,
        serialize: (params) => qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' }),
    },
});

// Function to refresh token
async function refreshToken() {
    const response = await apiClient.post('/login/oauth2/token', {
        refresh_token: store.get('refresh_token'),
        grant_type: 'refresh_token',
        client_id: process.env.REACT_APP_CANVAS_CLIENT_ID,
        client_secret: process.env.REACT_APP_CANVAS_CLIENT_SECRET,
    });
    const accessToken = response.data.access_token;
    const user = response.data.user;
    store.set('user', user);
    store.set('access_token', accessToken);
    return accessToken;
}

apiClient.interceptors.request.use((request) => {
    const accessToken = store.get('access_token');

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { response } = error;
        const refresh = store.get('refresh_token');
        if (response.status === 401 && refresh && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const accessToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (error) {
                // Handle refresh token failure
                notification.error({
                    message: 'Error',
                    description: error,
                });
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;
