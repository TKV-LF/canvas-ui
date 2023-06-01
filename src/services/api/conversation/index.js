import apiClient from '~/services/axios';

const Conversation = {
    getConversations: async () => {
        try {
            const response = await apiClient.get('/api/v1/conversations');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createConversation: async (payload) => {
        try {
            const response = await apiClient.post('/api/v1/conversations', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getConversation: async (payload) => {
        try {
            const response = await apiClient.get(`/api/v1/conversations/${payload.conversationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default Conversation;
