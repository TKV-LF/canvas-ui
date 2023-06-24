import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Menu } from '~/components/Layouts';
import { COURSE_MENU } from '~/constants';
import { CourseApi } from '~/services/api';

async function getCourse({ courseId }) {
    try {
        const response = await CourseApi.getCourse({ courseId });
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const CourseLayout = ({ courseId, children, title }) => {
    const [courseName, setCourseName] = useState('');
    useEffect(() => {
        getCourse({ courseId }).then((data) => {
            setCourseName(data.name);
        });
    }, [courseId]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
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
                                {courseName}
                            </Link>
                            <Typography color="text.primary">{title}</Typography>
                        </Breadcrumbs>
                    </div>
                </header>
            </div>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                    <Grid item xs={10}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default CourseLayout;
