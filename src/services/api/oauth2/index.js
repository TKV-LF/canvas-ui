import axios from 'axios';

const Oauth2 = {
    token: async (payload) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login/oauth2/token`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    authenticate: async (payload) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/courses?access_token=${payload}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default Oauth2;
