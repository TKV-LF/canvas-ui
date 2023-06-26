import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { CourseApi } from '~/services/api';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { notification } from 'antd';

import { CourseLayout } from '~/components/Layouts';

async function getQuizzes(payload) {
    try {
        const response = await CourseApi.getQuizzes(payload);
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { courseId } = useParams();

    const handleDelete = async (id) => {
        try {
            const response = await CourseApi.deleteQuiz({
                courseId: courseId,
                quizId: id,
            });
            console.log(response);
            notification.success({
                message: 'Xóa thành công',
            });
            // Update the state
            setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
        } catch (error) {
            // Rethrow the error to allow error handling further up the call stack
            throw error;
        }
    };

    useEffect(() => {
        let payload = {
            courseId: courseId,
        };

        getQuizzes(payload).then((data) => {
            setQuizzes(data);
        });
    }, []);


    return (
        <CourseLayout courseId={courseId} title="Các câu hỏi kiểm tra">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Các câu hỏi kiểm tra</h1>
                <Link
                    to={`/courses/${courseId}/quizzes/create`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Tạo câu hỏi kiểm tra
                </Link>
            </div>
            <div className="flex flex-col">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                        <div>
                            <Link to={`/courses/${courseId}/quizzes/${quiz.id}`} className="text-lg font-semibold">
                                {quiz.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                Hạn nộp: {quiz.due_at ? quiz.due_at.substring(0, 10) : 'Không có hạn nộp'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Bắt đầu: {quiz.lock_at ? quiz.lock_at.substring(0, 10) : 'Không có thời gian bắt đầu'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Kết thúc:{' '}
                                {quiz.unlock_at ? quiz.unlock_at.substring(0, 10) : 'Không có thời gian kết thúc'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to={`/courses/${courseId}/quizzes/${quiz.id}/edit`}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaEdit />
                            </Link>

                            <FaTrashAlt className="cursor-pointer" onClick={() => handleDelete(quiz.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </CourseLayout>
    );
};
export default Quizzes;
