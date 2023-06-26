import React, { useEffect } from 'react';
import { AuthApi } from '~/services/api';
import store from 'store';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

async function exchangeCodeForToken(payload) {
    try {
        const data = await AuthApi.token(payload);
        return data;
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error.message,
        });
    }
}

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            navigate('/');
            return;
        }

        const payload = {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_CANVAS_CLIENT_ID,
            client_secret: process.env.REACT_APP_CANVAS_CLIENT_SECRET,
            code,
        };

        exchangeCodeForToken(payload).then((data) => {
            store.set('access_token', data.access_token);
            store.set('refresh_token', data.refresh_token);
            store.set('user', data.user);
            notification.success({
                message: 'Success',
                description: 'You have successfully logged in!',
            });
            window.location.href = '/dashboard';
        });
    }, []);

    return <div></div>;
};

export default Login;
