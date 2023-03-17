const { default: apiClient } = require('~/services/axios');

const oAuth2Api = {
    getToken: (payload) => {
        return apiClient
            .post('/login/oauth2/token', payload)
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    },
};

export default oAuth2Api;
