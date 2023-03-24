import apiClient from '~/services/axios';

const CourseApi = {
    getAllCourse: async () => {
        try {
            const response = await apiClient.get('/api/v1/courses');
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
};

export default CourseApi;
