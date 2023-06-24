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

import withAuth from '~/components/withAuth';
import EditAssignmentForm from '~/pages/Course/Assignments/Assignment/EditAssignment';

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
