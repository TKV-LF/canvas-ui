// upload
import { Home, Login, Course, OAuthPopup } from '~/pages';

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
        path: '/course',
        component: Course,
    },
    {
        path: '/callback',
        component: OAuthPopup,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
