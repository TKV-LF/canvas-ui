import React from 'react';

export const withAuth = (WrappedComponent) => {
    const AuthCheck = (props) => {
        // Check if the user is logged in
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        // If not logged in, redirect to the login page
        if (!isLoggedIn) {
            window.location.href = '/';
            return null;
        }

        // If logged in, render the wrapped compone˝nt
        return <WrappedComponent {...props} />;
    };

    return AuthCheck;
};

export const withPublic = (WrappedComponent) => {
    const PublicCheck = (props) => {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

		console.log("BROOOO");

        if (isLoggedIn) {
            window.location.href = '/dashboard';
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return PublicCheck;
};
