// upload
import ProfileLayout from '~/components/Layouts/ProfileLayout';
import { Home, Dashboard, Login, ListCourse, Course, Calendar, Inbox, Grades, Profile, Assignments } from '~/pages';
import Communication from '~/pages/Communication';
import withAuth from '~/components/withAuth';

const publicRoutes = [
    {
        path: '/',
        layout: Home,
    },
    {
        path: '/dashboard',
        component: withAuth(Dashboard),
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/courses',
        component: ListCourse,
    },
    {
        path: '/courses/:id',
        component: Course,
    },
    {
        path: '/courses/:id/assignments',
        component: Assignments,
    },
    {
        path: '/profile',
        component: Profile,
        layout: ProfileLayout,
    },
    {
        path: '/admin',
    },
    {
        path: '/calendar',
        component: Calendar,
    },
    {
        path: '/inbox',
        component: Inbox,
    },
    {
        path: '/history',
    },
    {
        path: '/oauth2response',
        component: Login,
    },
    {
        path: '/grades',
        component: Grades,
    },
    {
        path: '/profile/communication',
        component: Communication,
        layout: ProfileLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
