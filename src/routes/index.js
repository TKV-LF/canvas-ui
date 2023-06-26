// upload
import SettingLayout from '~/components/Layouts/SettingLayout';
import {
    Home,
    Dashboard,
    Login,
    ListCourse,
    Course,
    Calendar,
    Inbox,
    Grades,
    Assignments,
    Assignment,
    Quizzes,
    Quiz,
    CreateQuiz,
    EditQuiz,
    CreateQuestion,
    EditQuestion,
} from '~/pages';
import { Notification, Profile, Announcement } from '~/pages/Settings';

import { withAuth, withPublic } from '~/components/route-guard';
import EditAssignmentForm from '~/pages/Course/Assignments/Assignment/EditAssignment';
import { Fragment } from 'react';

const mapRoute = (route, mapper) => {
    if (route.layout) {
        return {
            ...route,
            layout: mapper(route.layout),
        };
    }

    return {
        ...route,
        component: mapper(route.component),
    };
};

const privateRoutes = [
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
        component: Assignments,
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
        path: '/courses/:courseId/assignments/:assignmentId/edit',
        component: EditAssignmentForm,
    },
    {
        path: '/courses/:courseId/quizzes',
        component: Quizzes,
    },
    {
        path: '/courses/:courseId/quizzes/:quizId',
        component: Quiz,
    },
    {
        path: '/courses/:courseId/quizzes/create',
        component: CreateQuiz,
    },
    {
        path: '/courses/:courseId/quizzes/:quizId/edit',
        component: EditQuiz,
    },
    {
        path: '/courses/:courseId/quizzes/:quizId/questions/create',
        component: CreateQuestion,
    },
    {
        path: '/courses/:courseId/quizzes/:quizId/questions/:questionId/edit',
        component: EditQuestion,
    },
    {
        path: '/profile',
        component: Profile,
        layout: SettingLayout,
    },
    {
        path: '/admin',
        component: Fragment,
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
        component: Fragment,
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
].map((route) => mapRoute(route, withAuth));

const publicRoutes = [
    {
        path: '/oauth2response',
        component: Login,
    },
    {
        path: '/',
        layout: Home,
    },
].map((route) => mapRoute(route, withPublic));

export { publicRoutes, privateRoutes };
