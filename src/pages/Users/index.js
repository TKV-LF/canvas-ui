import { Link, useParams } from 'react-router-dom';
import { CourseLayout } from '~/components/Layouts';
import UserList from './UserList';
import { useEffect } from 'react';
import { UserApi } from '~/services/api';
import { useState } from 'react';

function Users() {
    const { courseId } = useParams();
    const [users, setUsers] = useState([]);

    const getUsersInCourse = async (courseId) => {
        try {
            const response = await UserApi.getUsersInCourse(courseId);
            setUsers(response);
        } catch (error) {
            console.log('loi roi', error);
        }
    };

    useEffect(() => {
        getUsersInCourse(courseId);
    }, [courseId]);

    return (
        <CourseLayout courseId={courseId} title="Mọi người">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Danh sách người dùng trong khoá học</h1>

                <Link
                    to={`/courses/${courseId}/quizzes/create`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Tạo câu hỏi kiểm tra
                </Link>
            </div>

            <div className="flex flex-col">
                <div style={{ height: 400, width: '100%' }}>
                    {users.length > 0 ? (
                        <UserList data={users}></UserList>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Không có người dùng nào trong khoá học này</p>
                        </div>
                    )}
                </div>
            </div>
        </CourseLayout>
    );
}

export default Users;
