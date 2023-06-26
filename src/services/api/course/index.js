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
            const response = await apiClient.post(`/api/v1/accounts/${payload.course.accountId}/courses`, payload);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },

    deleteCourse: async (payload) => {
        try {
            const response = await apiClient.delete(`/api/v1/courses/${payload.courseId}`, {
                data: { event: 'delete' },
            });
            return response;
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
    },
    // List assignments group
    getAssignmentGroups: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/assignment_groups`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
    // List assignments
    getAssignments: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/assignments`);
            return response.data;
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    },
    // Create assignment groups
    createAssignmentGroup: async (payload) => {
        try {
            const response = await apiClient.post(`/api/v1/courses/${payload.courseId}/assignment_groups`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    },
    // Edit assignment groups
    editAssignmentGroup: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/assignment_groups/${payload.assignmentGroupId}`,
                payload,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete assignment groups
    deleteAssignmentGroup: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/assignment_groups/${payload.assignmentGroupId}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create assignment
    createAssignment: async (payload) => {
        try {
            const response = await apiClient.post(`/api/v1/courses/${payload.courseId}/assignments`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAssignment: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/assignments/${payload.assignmentId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Edit assignment
    editAssignment: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/assignments/${payload.assignmentId}`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Delete assignment
    deleteAssignment: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/assignments/${payload.assignmentId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Enrollments
    enrollCourse: async (payload) => {
        try {
            const response = await apiClient.post(`/api/v1/courses/${payload.course_id}/enrollments`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizzes: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/quizzes`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuiz: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    createQuiz: async (payload) => {
        try {
            const response = await apiClient.post(`/api/v1/courses/${payload.courseId}/quizzes`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    },
    editQuiz: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteQuiz: async (payload) => {
        try {
            const response = await apiClient.delete(`/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizQuestions: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/questions`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizQuestion: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/questions/${payload.questionId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    createQuizQuestion: async (payload) => {
        try {
            const response = await apiClient.post(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/questions`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    editQuizQuestion: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quiz_id}/questions/${payload.id}`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteQuizQuestion: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quiz_id}/questions/${payload.question_id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizQuestionGroup: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/groups/${payload.questionGroupId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    createQuizQuestionGroup: async (payload) => {
        try {
            const response = await apiClient.post(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/groups`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    editQuizQuestionGroup: async (payload) => {
        try {
            const response = await apiClient.put(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/groups/${payload.questionGroupId}`,
                payload,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteQuizQuestionGroup: async (payload) => {
        try {
            const response = await apiClient.delete(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/groups/${payload.questionGroupId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizQuestionGroupQuestions: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/groups/${payload.questionGroupId}/questions`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizSubmissions: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/submissions`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    getQuizSubmission: async (payload) => {
        try {
            const response = await apiClient.get(
                `/api/v1/courses/${payload.courseId}/quizzes/${payload.quizId}/submissions/${payload.submissionId}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    listEnrollments: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/courses/${payload.courseId}/enrollments`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default CourseApi;
