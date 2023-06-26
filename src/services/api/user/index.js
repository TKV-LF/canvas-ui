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

    getUserInformation: async (userId) => {
        try {
            const response = await apiClient.get(`/api/v1/users/${userId}`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    updateUserInformation: async (userId, payload) => {
        try {
            const response = await apiClient.put(`/api/v1/users/${userId}`, payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    getUsersInCourse: async (courseId) => {
        try {
            const response = await apiClient.get(`api/v1/courses/${courseId}/enrollments`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default UserApi;
