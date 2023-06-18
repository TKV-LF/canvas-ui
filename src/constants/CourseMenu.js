export const COURSE_MENU = [
    {
        label: 'Trang chủ',
        path: '/courses/:courseId',
    },
    {
        label: 'Thông báo chung',
        path: '/courses/:courseId/announcements',
        role: 'teacher',
    },
    {
        label: 'Bài tập',
        path: '/courses/:courseId/assignments',
    },
    {
        label: 'Thảo luận',
        path: '/courses/:courseId/discussions',
    },
    {
        label: 'Điểm',
        path: '/courses/:courseId/grades',
    },
    {
        label: 'Mọi người',
        path: '/courses/:courseId/users',
    },
    {
        label: 'Các trang',
        path: '/courses/:courseId/wiki',
    },
    {
        label: 'Tập tin',
        path: '/courses/:courseId/files',
    },
    {
        label: 'Chương trình học',
        path: '/courses/:courseId/assignments/syllabus',
    },
    {
        label: 'Kết quả',
        path: '/courses/:courseId/outcomes',
    },
    {
        label: 'Bảng đánh giá theo tiêu chí',
        path: '/courses/:courseId/rubrics',
    },
    {
        label: 'Các câu hỏi kiểm tra',
        path: '/courses/:courseId/quizzes',
    },
    {
        label: 'Các học phần',
        path: '/courses/:courseId/modules',
    },
    {
        label: 'BigBlueButton',
        path: '/courses/:courseId/conferences',
    },
    {
        label: 'Cộng tác',
        path: '/courses/:courseId/collaborations',
    },
    // {
    // 	label: 'Attendance',
    // 	path: '/courses/:courseId/attendance',
    // },
    // {
    // 	label: 'New Analytics',
    // 	path: '/courses/:courseId/analytics',
    // },
    {
        label: 'Cài đặt',
        path: '/courses/:courseId/settings',
    },
];
