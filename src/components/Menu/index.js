export const courseMenu = [
	{
		label: 'Home',
		path: '/courses/:id',
	},
	{
		label: 'Announcements',
		path: '/courses/:id/announcements',
		role: 'teacher',
	},
	{
		label: 'Assignments',
		path: '/courses/:id/assignments',
	},
	{
		label: 'Discussions',
		path: '/courses/:id/discussions',
	},
	{
		label: 'Điểm',
		path: '/courses/:id/grades',
	},
	{
		label: 'People',
		path: '/courses/:id/users',
	},
	{
		label: 'Pages',
		path: '/courses/:id/wiki',
	},
	{
		label: 'Files',
		path: '/courses/:id/files',
	},
	{
		label: 'Syllabus',
		path: '/courses/:id/assignments/syllabus',
	},
	{
		label: 'Outcomes',
		path: '/courses/:id/outcomes',
	},
	{
		label: 'Rubrics',
		path: '/courses/:id/rubrics',
	},
	{
		label: 'Quizzes',
		path: '/courses/:id/quizzes',
	},
	{
		label: 'Modules',
		path: '/courses/:id/modules',
	},
	{
		label: 'BigBlueButton',
		path: '/courses/:id/conferences',
	},
	{
		label: 'Collaborations',
		path: '/courses/:id/collaborations',
	},
	// {
	// 	label: 'Attendance',
	// 	path: '/courses/:id/attendance',
	// },
	// {
	// 	label: 'New Analytics',
	// 	path: '/courses/:id/analytics',
	// },
	{
		label: 'Cài đặt',
		path: '/courses/:id/settings',
	},
];
