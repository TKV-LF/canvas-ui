// upload
import { Home, Login, ListCourse, Course, OAuthPopup, Calendar, Inbox } from '~/pages';

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
		component: ListCourse,
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
