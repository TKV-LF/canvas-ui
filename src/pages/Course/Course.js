import React, { useState, useEffect } from 'react';
import { Menu } from '~/components/Layouts';
import { Group, AssignmentsMenu } from '~/pages/Course/Assignments';
import { COURSE_MENU } from 'src/constants';
import Grid from '@mui/material/Grid';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { CourseApi } from '~/services/api';

async function getData(payload) {
    try {
        const data = await CourseApi.getCourse(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}
const Course = () => {
    const [course, setCourse] = useState();
    const { courseId } = useParams();
    useEffect(() => {
        getData({ courseId: courseId }).then((data) => {
            setCourse(data);
        });
    }, []);
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
                        <Typography color="text.primary">{course && course.name}</Typography>
                    </Breadcrumbs>
                </div>
            </header>
            <div className="mx-8">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid item xs={12}>
                            <AssignmentsMenu />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Group courseId={id} data={groups} assignments={[]} /> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Menu items={COURSE_MENU} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Course;
