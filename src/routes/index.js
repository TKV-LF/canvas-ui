// upload
import SettingLayout from '~/components/Layouts/SettingLayout';
import { Home, Dashboard, Login, ListCourse, Course, Calendar, Inbox, Grades, Assignments, Assignment } from '~/pages';
import {Notification, Profile, Announcement} from '~/pages/Settings';

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
        path: '/courses/:courseId',
        component: Course,
    },
    {
        path: '/courses/:courseId/assignments',
        component: Assignments,
    },
    {
        path: '/courses/:courseId/assignments/:assignmentId',
        component: Assignment,
    },
    {
        path: '/profile',
        component: Profile,
        layout: SettingLayout,
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
        path: '/courses/:courseId/grades',
        component: Grades,
    },
    {
        path: '/settings',
        component: Profile,
        layout: SettingLayout,
        default: '/settings/profile',
    },
    {
        path: '/settings/notifications',
        component: Notification,
        layout: SettingLayout,
    },
    {
        path: '/settings/announcement',
        component: Announcement,
        layout: SettingLayout,
    },
    {
        path: '/settings/profile',
        component: Profile,
        layout: SettingLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
