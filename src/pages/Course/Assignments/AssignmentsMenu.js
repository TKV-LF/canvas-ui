import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { FormDialog } from '~/components/Form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { set } from 'store';
import CreateAssignment from './CreateAssignment';

const AssignmentsMenu = ({ courseId, assignmentGroups }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleFormSubmit = async (formData) => {
        try {
            setIsLoading(true);
            if (!formData.name) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Vui lòng nhập tên',
                });
                setIsLoading(false);
                return;
            }
            if (!formData.weight) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Vui lòng nhập trọng số',
                });
                setIsLoading(false);
                return;
            }

            if (!Number.isInteger(parseInt(formData.weight))) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Trọng số phải là số nguyên',
                });
                setIsLoading(false);
                return;
            }

            const payload = {
                name: formData.name,
                group_weight: formData.weight,
                courseId: courseId,
            };

            const response = await CourseApi.createAssignmentGroup(payload);
            if (response.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo nhóm bài tập thành công',
                });
                setOpen(false);
                window.location.reload();
            }

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Lỗi',
                description: 'Có phần nào đó không đúng, vui lòng thử lại',
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {}, []);
    return (
        <div className="flex border-b border-[#c7cdd1] mb-6 pb-3">
            <div className="flex flex-col w-1/6">
                <TextField id="outlined-basic" label="Tìm kiếm bài tập" variant="outlined" />
            </div>
            <div className="flex flex-col w-5/6">
                <div className="flex justify-end">
                    <div>
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            <AiOutlinePlus /> Nhóm bài tập
                        </Button>
                        <FormDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            onSubmit={handleFormSubmit}
                            title="Tạo mới nhóm bài tập"
                            fields={[
                                {
                                    label: 'Tên',
                                    name: 'name',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    label: 'Trọng số',
                                    name: 'weight',
                                    type: 'int',
                                    required: true,
                                },
                            ]}
                        />
                    </div>
                    <div className="ml-5">
                        <Link to="#">
                            <CreateAssignment title="Tạo bài tập" assignmentGroups={assignmentGroups} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AssignmentsMenu;
