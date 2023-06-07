// upload
import ProfileLayout from '~/components/Layouts/ProfileLayout';
import {
    Home,
    Dashboard,
    Login,
    ListCourse,
    Course,
    OAuthPopup,
    Calendar,
    Inbox,
    Grades,
    Profile,
    Assignments,
} from '~/pages';
import Communication from '~/pages/Communication';

const publicRoutes = [
    {
        path: '/',
        layout: Home,
    },
    {
        path: '/dashboard',
        component: Dashboard,
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
        path: '/callback',
        component: OAuthPopup,
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
