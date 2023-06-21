import apiClient from '~/services/axios';

const Account = {
    getAccounts: async () => {
        try {
            const response = await apiClient.get('/api/v1/accounts');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUser: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/users/self`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createAccount: async (payload) => {
        try {
            const response = await apiClient.post('/api/v1/conversations', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getRole: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/accounts/${payload.accountId}/roles`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default Account;
