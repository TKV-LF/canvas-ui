import apiClient from '~/services/axios';

const GradeApi = {
    getGradebookDays: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/gradebook_history/days`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    getCustomGradebookColumns: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/custom_gradebook_columns`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    createCustomGradebookColumn: async (payload) => {
        try {
            const response = await apiClient.post(
                `/api/v1/courses/${payload.courseId}/custom_gradebook_columns`,
                payload,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    updateCustomGradebookColumn: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/custom_gradebook_columns/${payload.columnId}`,
                payload,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    deleteCustomGradebookColumn: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/custom_gradebook_columns/${payload.columnId}`,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
    getSubmission: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/gradebook_history/${payload.date}/graders/${payload.graderId}/assignments/${payload.assignmentId}/submissions`,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
    listUncollatedSubmissionVersions: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/gradebook_history/feed`,
            );
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    }
};

export default GradeApi;
