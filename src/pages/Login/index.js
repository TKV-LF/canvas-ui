import React from 'react';
import { useOAuth2 } from '~/hooks';
import store from 'store';

const Login = () => {
	const { data, loading, error, getAuth } = useOAuth2({
		authorizeUrl: 'http://canvas.docker/login/oauth2/auth',
		clientId: '10000000000001',
		clientSecret: 'xcSEau0qqyb3xjVQa6uK7PZtsbgeZ2vFtFEBr1Hy7hzkyUbruEjdHHQ4q1neDOKO',
		redirectUri: `http://localhost:3000/callback`,
		responseType: 'code',
	});

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
		return <pre id="implicit-grant-data">{JSON.stringify(data)}</pre>;
	}

	return (
		<button style={{ margin: '24px' }} type="button" id="login-with-implicit-grant" onClick={() => getAuth()}>
			Login with Implicit Grant (Token)
		</button>
	);
};

export default Login;
