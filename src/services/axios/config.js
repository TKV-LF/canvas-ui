const { default: apiClient } = require('./');

const externalHeader = (url) => {
    const headers = {
        headers: {
            'Target-URL': url,
        },
    };
    return headers;
};

export const get = (url, params) => {
    return apiClient.get('', { ...params }, {
        headers: {
            'Target-URL': url,
        }
    });
};

export const post = (url, data) => apiClient.post('', data, externalHeader(url));
export const put = (url, data) => apiClient.put(url, data, externalHeader(url));
export const patch = (url, data) => apiClient.put(url, data, externalHeader(url)));
export const remove = (url) => apiClient.put('', null, externalHeader(url));
