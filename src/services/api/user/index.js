import apiClient from '~/services/axios';
import store from 'store';

const user = store.get('user');

const UserApi = {
    getRecentHistory: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/users/${user.id}/history`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
};

export default UserApi;
