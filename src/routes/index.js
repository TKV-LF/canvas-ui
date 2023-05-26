// upload
import { Home, Dashboard, Login, ListCourse, Course, OAuthPopup, Calendar, Inbox, Grades, Profile, Assignments } from '~/pages';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
