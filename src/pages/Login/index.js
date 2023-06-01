import React from 'react';
import { useOAuth2 } from '~/hooks';
import store from 'store';
import { AccountApi } from '~/services/api';
import { redirect } from 'react-router-dom';

async function getData() {
    try {
        const response = await AccountApi.getAccounts();
        return response;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const Login = () => {
    const { data, loading, error, getAuth } = useOAuth2({
        authorizeUrl: 'http://canvas.docker/login/oauth2/auth',
        clientId: '10000000000001',
        clientSecret: 'xcSEau0qqyb3xjVQa6uK7PZtsbgeZ2vFtFEBr1Hy7hzkyUbruEjdHHQ4q1neDOKO',
        redirectUri: `http://localhost:3000/callback`,
        responseType: 'code',
        grantType: 'authorization_code',
    });
    // const { cache, updateCache } = useContext(CacheContext);

    const isLoggedIn = Boolean(data?.access_token); // or whatever...

    if (error) {
        return <div>Error</div>;
    }

    if (loading) {
        return <div id="implicit-grant-loading">Loading...</div>;
    }

    if (isLoggedIn) {
        store.set('access_token', data.access_token);
        store.set('refresh_token', data.refresh_token);
        store.set('user', data.user);

        getData().then((data) => {
            localStorage.setItem('accounts', JSON.stringify(data));
        });

        window.location.href = '/dashboard';
        // return redirect('/dashboard');
    }

    return (
        <button style={{ margin: '24px' }} type="button" id="login-with-implicit-grant" onClick={() => getAuth()}>
            Login
        </button>
    );
};

export default Login;
