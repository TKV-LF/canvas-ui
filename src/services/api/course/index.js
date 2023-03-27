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

	getCourse: async (payload) => {
		try {
			const response = await apiClient.get(`/api/v1/courses/${payload.courseId}`);
			return response.data;
		} catch (error) {
			// Rethrow the error to allow error handling further up the call stack
			throw error;
		}
	},

	createCourse: async (payload) => {
		try {
			const response = await apiClient.post(`/api/v1/accounts/${payload.accountId}/courses`, payload);
			return response.data;
		} catch (error) {
			// Rethrow the error to allow error handling further up the call stack
			throw error;
		}
	},

	uploadFile: async (payload) => {
		try {
			const response = await apiClient.post(`/api/v1/courses/${payload.courseId}/files`, payload);
			return response.data;
		} catch (error) {
			// Rethrow the error to allow error handling further up the call stack
			throw error;
		}
	},

	listStudents: async (payload) => {
		try {
			const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/students`);
			return response.data;
		} catch (error) {
			// Rethrow the error to allow error handling further up the call stack
			throw error;
		}
	},
	// List users
	listTeachers: async (payload) => {
		try {
			const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/users`);
			return response.data;
		} catch (error) {
			// Rethrow the error to allow error handling further up the call stack
			throw error;
		}
	}
};

export default CourseApi;
