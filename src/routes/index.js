// upload
import { Home, Login, Course, OAuthPopup, Dashboard } from '~/pages';

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
        path: '/courses',
        component: Course,
    },
    {
        path: '/courses/:id',
        component: Course,
    },
    {
        path: '/profile',
    },
    {
        path: '/admin',
    },
    {
        path: '/calendar',
    },
    {
        path: '/inbox'
    },
    {
        path: '/history',
    },
    {
        path: '/callback',
        component: OAuthPopup,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
