import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { FormDialog } from '~/components/Form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { set } from 'store';
import CreateAssignment from './CreateAssignment';

const AssignmentsMenu = ({ courseId, assignments }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [assignmentGroups, setAssignmentGroups] = useState([]);

    const handleFormSubmit = async (formData) => {
        try {
            setIsLoading(true);
            const payload = {
                name: formData.name,
                courseId: courseId,
            };
            const response = await CourseApi.createAssignmentGroup(payload);
            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: 'Assignment group created successfully',
                });
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Something went wrong',
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setAssignmentGroups(assignments);
    }, []);
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
                            ]}
                        />
                    </div>
                    <div className="ml-5">
                        <Link to="#">
                            <CreateAssignment title="Tạo bài tập" assignments={assignmentGroups} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AssignmentsMenu;
