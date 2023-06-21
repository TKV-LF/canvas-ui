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
