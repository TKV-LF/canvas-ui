const { default: apiClient } = require('.');

export const get = (url, params) => {
    return apiClient.get(url, { ...params });
};

export const post = (url, data) => apiClient.post(url, data);
export const put = (url, data) => apiClient.put(url, data);
export const patch = (url, data) => apiClient.put(url, data);
export const remove = (url) => apiClient.delete(url, data);
