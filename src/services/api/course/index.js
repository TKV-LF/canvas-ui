const { default: apiClient } = require('~/services/axios');

const courseApi = {
    // get all course
    getAllCourse: (payload) => {
        return apiClient
            .get('', {
                headers: {
                    'Target-URL': 'http://canvas.docker/api/v1/courses',
                },
            })
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    },
};
export default courseApi;
