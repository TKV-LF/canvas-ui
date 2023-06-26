import apiClient from '~/services/axios';

const enrollmentApi = {
    updateEnrollment: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/enrollments/${payload.enrollmentId}`,
                {
                    data: {
                        task: payload.task || 'delete',
                    },
                },
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    enrollUser: async (courseId, payload) => {
        try {
            const response = await apiClient.post(`/api/v1/courses/${courseId}/enrollments`, payload);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default enrollmentApi;
