import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { FormDialog } from '~/components/Form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { set } from 'store';

const AssignmentsMenu = ({ courseId }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
    return (
        <div className="flex border-b border-[#c7cdd1] mb-6 pb-3">
            <div className="flex flex-col w-1/6">
                <TextField id="outlined-basic" label="Search for Assignment" variant="outlined" />
            </div>
            <div className="flex flex-col w-5/6">
                <div className="flex justify-end">
                    <div>
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            <AiOutlinePlus /> Group
                        </Button>
                        <FormDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            onSubmit={handleFormSubmit}
                            title="Add new group"
                            fields={[
                                {
                                    label: 'Name',
                                    name: 'name',
                                    type: 'text',
                                    required: true,
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <Link to="#">
                            <Button variant="outlined">
                                <AiOutlinePlus /> Assginment
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AssignmentsMenu;
