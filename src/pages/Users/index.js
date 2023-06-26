import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseLayout } from '~/components/Layouts';
import { UserApi } from '~/services/api';
import ButtonAddUser from './ButtonAddUser';
import UserList from './UserList';

function Users() {
    const { courseId } = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsersInCourse = async (courseId) => {
        setLoading(true);

        try {
            const response = await UserApi.getUsersInCourse(courseId);

            setUsers(response);
            setLoading(false);
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

                <ButtonAddUser></ButtonAddUser>
            </div>

            <div className="flex flex-col">
                <div style={{ height: 400, width: '100%' }}>
                    {users.length > 0 ? (
                        <UserList data={users} refresh={() => getUsersInCourse(courseId)} loading={loading}></UserList>
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
