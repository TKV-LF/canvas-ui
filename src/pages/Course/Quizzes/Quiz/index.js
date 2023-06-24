import React, { useEffect, useState } from 'react';
import { CourseLayout } from '~/components/Layouts';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { ActionMenu } from '~/components/Menu';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

async function getQuiz(payload) {
    try {
        const response = await CourseApi.getQuiz(payload);
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

// async function getAssignmentGroups({ courseId }) {
//     try {
//         const response = await CourseApi.getAssignmentGroups({ courseId });
//         return response.data;
//     } catch (error) {
//         // Rethrow the error to allow error handling further up the call stack
//         throw error;
//     }
// }

async function deleteQuiz({ courseId, quizId }) {
    try {
        const response = await CourseApi.deleteQuiz({ courseId, quizId });
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function getQuizQuestions({ courseId, quizId }) {
    try {
        const response = await CourseApi.getQuizQuestions({ courseId, quizId });
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function deleteQuizQuestion({ courseId, quizId, questionId }) {
    try {
        const response = await CourseApi.deleteQuizQuestion({ courseId, quizId, questionId });
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const Quizz = () => {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState();
    const [quizQuestions, setQuizQuestions] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleDelete = () => {
        deleteQuiz({ courseId, quizId })
            .then(() => {
                notification.success({
                    message: 'Xóa bài tập thành công',
                });
                navigate(
                    generatePath('/courses/:courseId/quizzes', {
                        courseId,
                    }),
                );
            })
            .catch((error) => {
                notification.error({
                    message: 'Xóa bài tập thất bại',
                    description: error.message,
                });
            });
    };

    const handleEdit = () => {
        navigate(
            generatePath('/courses/:courseId/quizzes/:quizId/edit', {
                quizId,
                courseId,
            }),
        );
    };

    const questionOptions = [
        {
            key: 'Edit',
            name: 'Chỉnh sửa',
            icon: 'edit',
            handleFunction: (questionId) => {
                navigate(
                    generatePath('/courses/:courseId/quizzes/:quizId/questions/:questionId/edit', {
                        quizId,
                        courseId,
                        questionId,
                    }),
                );
            },
        },
        {
            key: 'Delete',
            name: 'Xóa',
            icon: 'delete',
            handleFunction: (questionId) => {
                deleteQuizQuestion({ courseId, quizId, questionId })
                    .then(() => {
                        notification.success({
                            message: 'Xóa câu hỏi thành công',
                        });
                        setQuizQuestions(quizQuestions.filter((question) => question.id !== questionId));
                    })
                    .catch((error) => {
                        notification.error({
                            message: 'Xóa câu hỏi thất bại',
                            description: error.message,
                        });
                    });
            },
        },
    ];

    const options = [
        {
            key: 'Edit',
            name: 'Chỉnh sửa',
            icon: 'edit',
            handleFunction: handleEdit,
        },
        {
            key: 'Delete',
            name: 'Xóa',
            icon: 'delete',
            handleFunction: handleDelete,
        },
        {
            key: 'addQuestion',
            name: 'Thêm câu hỏi',
            icon: 'plus',
            handleFunction: () => {
                navigate(
                    generatePath('/courses/:courseId/quizzes/:quizId/questions/create', {
                        quizId,
                        courseId,
                    }),
                );
            },
        },
        {
            key: 'addQuestionGroup',
            name: 'Thêm nhóm câu hỏi',
            icon: 'plus',
            handleFunction: () => {
                navigate(
                    generatePath('/courses/:courseId/quizzes/:quizId/question-groups/create', {
                        quizId,
                        courseId,
                    }),
                );
            },
        },
    ];

    useEffect(() => {
        let payload = {
            courseId: courseId,
            quizId: quizId,
        };

        getQuiz(payload).then((data) => {
            setQuiz(data);
        });

        getQuizQuestions(payload).then((data) => {
            setQuizQuestions(data);
        });
    }, []);

    return (
        <div>
            {quiz && (
                <CourseLayout courseId={courseId} title={`Các câu hỏi kiểm tra / ${quiz.title}`}>
                    <div className="p-4 relative">
                        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div dangerouslySetInnerHTML={{ __html: quiz.description }}></div>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Loại câu hỏi kiểm tra</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.quiz_type === 'assignment' ? 'Bài tập' : 'Bài kiểm tra'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nhóm bài tập</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.assignment_group_id}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Xáo trộn</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.shuffle_answers ? 'Có' : 'Không'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Hiển thị đáp án đúng sau khi làm bài
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.show_correct_answers ? 'Có' : 'Không'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Thời gian làm bài</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.time_limit === null ? 'Không giới hạn' : quiz.time_limit + ' phút'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Số lần làm bài</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.allowed_attempts === -1
                                            ? 'Không giới hạn'
                                            : quiz.allowed_attempts + ' lần'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Hạn nộp</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.due_at ? quiz.due_at.substring(0, 10) : 'Không có hạn nộp'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Bắt đầu</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.unlock_at
                                            ? quiz.unlock_at.substring(0, 10)
                                            : 'Không có thời gian bắt đầu'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Kết thúc</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {quiz.lock_at ? quiz.lock_at.substring(0, 10) : 'Không có thời gian kết thúc'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-bold mb-4">Các câu hỏi</h2>
                            <div className="border-t border-gray-200">
                                <dl>
                                    {quizQuestions.map((question, index) => (
                                        <div
                                            key={question.id}
                                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative"
                                        >
                                            <dt className="text-sm font-medium text-gray-500">
                                                Câu {index + 1}: {question.question_name}
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <div dangerouslySetInnerHTML={{ __html: question.question_text }}></div>
                                                <div className="mt-4">
                                                    <h3 className="text-lg font-bold mb-2">Các đáp án</h3>
                                                    <ul className="list-disc list-inside">
                                                        {question.answers.map((answer, index) => (
                                                            <li
                                                                key={answer.id}
                                                                className={`${
                                                                    index == 0 ? 'text-green-500' : 'text-red-500'
                                                                }`}
                                                            >
                                                                {answer.text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {question.points_possible}
                                                </div>
                                            </dd>
                                            <div className="absolute top-3 right-0">
                                                <div>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        MenuListProps={{
                                                            'aria-labelledby': 'long-button',
                                                        }}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        PaperProps={{
                                                            style: {
                                                                width: '20ch',
                                                            },
                                                        }}
                                                    >
                                                        {questionOptions.map((option) => (
                                                            <MenuItem
                                                                key={option.key}
                                                                onClick={() => option.handleFunction(question.id)}
                                                            >
                                                                {option.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="absolute top-3 right-0">
                            <ActionMenu options={options} />
                        </div>
                    </div>
                </CourseLayout>
            )}
        </div>
    );
};

export default Quizz;
