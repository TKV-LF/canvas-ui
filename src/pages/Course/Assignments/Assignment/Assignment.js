import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Menu } from '~/components/Layouts';
import { COURSE_MENU } from 'src/constants';

import { ActionMenu } from '~/components/Menu';
import { CourseApi } from '~/services/api';

import { notification } from 'antd';

async function getAssignment({ courseId, assignmentId }) {
    try {
        const response = await CourseApi.getAssignment({ courseId, assignmentId });
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function getAssignmentGroup({ courseId, assignmentId }) {
    try {
        const response = await CourseApi.getAssignmentGroups({ courseId });
        return response.data;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function deleteAssignment({ courseId, assignmentId }) {
    try {
        const response = await CourseApi.deleteAssignment({ courseId, assignmentId });
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const formatDateStr = (date) => date && date.substring(0, 10);

const Assignment = () => {
    const { courseId, assignmentId } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [assignmentGroups, setAssignmentGroups] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getAssignment({ courseId, assignmentId }).then((data) => {
            console.log('data', data);
            setAssignment(data);
        });

        getAssignmentGroup({ courseId }).then((data) => {
            setAssignmentGroups(data);
        });
    }, []);

    if (!assignment) {
        return null;
    }

    const handleDelete = () => {
        deleteAssignment({ courseId, assignmentId })
            .then(() => {
                notification.success({
                    message: 'Xóa bài tập thành công',
                });
                window.location.href = `/courses/${courseId}/assignments`;
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
            generatePath('/courses/:courseId/assignments/:assignmentId/edit', {
                assignmentId,
                courseId,
            }),
        );
    };

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
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            <header className="bg-white shadow ">
                <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/dashboard">
                            Trang chủ
                        </Link>
                        <Link underline="hover" color="inherit" to="/courses">
                            Tất cả khoá học
                        </Link>
                        <Link underline="hover" color="inherit" to={`/courses/${courseId}`}>
                            Khoá học
                        </Link>
                        <Link underline="hover" color="inherit" to={`/courses/${courseId}/assgiments`}>
                            Bài tập
                        </Link>
                        <Typography color="text.primary">{assignment.name}</Typography>
                    </Breadcrumbs>
                </div>
            </header>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                    <Grid item xs={8}>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Thông tin bài tập</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Thông tin chi tiết về bài tập
                                    </p>
                                </div>
                                <ActionMenu options={options} />
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Tên bài tập</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {assignment.name}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <div dangerouslySetInnerHTML={{ __html: assignment.description }}></div>
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Điểm</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {assignment.points_possible}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Hạn nộp</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {assignment.due_at
                                                ? assignment.due_at.substring(0, 10)
                                                : 'Không có hạn nộp'}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Bắt đầu</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {assignment.unlock_at
                                                ? assignment.unlock_at.substring(0, 10)
                                                : 'Không có hạn nộp'}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Kết thúc</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {assignment.lock_at
                                                ? assignment.lock_at.substring(0, 10)
                                                : 'Không có hạn nộp'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Assignment;
