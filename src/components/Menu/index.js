export const courseMenu = [
	{
		label: 'Trang chủ',
		path: '/courses/:id',
	},
	{
		label: 'Thông báo chung',
		path: '/courses/:id/announcements',
		role: 'teacher',
	},
	{
		label: 'Bài tập',
		path: '/courses/:id/assignments',
	},
	{
		label: 'Thảo luận',
		path: '/courses/:id/discussions',
	},
	{
		label: 'Điểm',
		path: '/courses/:id/grades',
	},
	{
		label: 'Mọi người',
		path: '/courses/:id/users',
	},
	{
		label: 'Các trang',
		path: '/courses/:id/wiki',
	},
	{
		label: 'Tập tin',
		path: '/courses/:id/files',
	},
	{
		label: 'Chương trình học',
		path: '/courses/:id/assignments/syllabus',
	},
	{
		label: 'Kết quả',
		path: '/courses/:id/outcomes',
	},
	{
		label: 'Bảng đánh giá theo tiêu chí',
		path: '/courses/:id/rubrics',
	},
	{
		label: 'Các câu hỏi kiểm tra',
		path: '/courses/:id/quizzes',
	},
	{
		label: 'Các học phần',
		path: '/courses/:id/modules',
	},
	{
		label: 'BigBlueButton',
		path: '/courses/:id/conferences',
	},
	{
		label: 'Cộng tác',
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
