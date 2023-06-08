import React from 'react';

const withAuth = (WrappedComponent) => {
    const AuthCheck = (props) => {
        // Check if the user is logged in
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        // If not logged in, redirect to the login page
        if (!isLoggedIn) {
            window.location.href = '/';
        }

        // If logged in, render the wrapped compone˝nt
        return <WrappedComponent {...props} />;
    };

    return AuthCheck;
};

export default withAuth;
