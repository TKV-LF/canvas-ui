// upload
import { Home, Login, OAuthPopup } from '~/pages';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/callback',
        component: OAuthPopup,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
