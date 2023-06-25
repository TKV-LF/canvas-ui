export const COURSE_MENU = [
    {
        label: 'Trang chủ',
        path: '/courses/:courseId',
    },
    {
        label: 'Thông báo chung(Coming soon)',
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
        label: 'Mọi người(Coming soon)',
        path: '/courses/:courseId/users',
    },
    {
        label: 'Các trang(Coming soon)',
        path: '/courses/:courseId/wiki',
    },
    
    {
        label: 'Chương trình học(Coming soon)',
        path: '/courses/:courseId/assignments/syllabus',
    },
    {
        label: 'Kết quả(Coming soon)',
        path: '/courses/:courseId/outcomes',
    },
    {
        label: 'Bảng đánh giá theo tiêu chí(Coming soon)',
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
        label: 'Cài đặt(Coming soon)',
        path: '/courses/:courseId/settings',
    },
];
