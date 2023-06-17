import React, { useState, useEffect } from 'react';
import { Menu } from '~/components/Layouts';
import { Group, AssignmentsMenu } from '~/pages/Course/Assignments';
import { courseMenu } from '~/components/Menu';
import Grid from '@mui/material/Grid';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { CourseApi } from '~/services/api';

const groups = [
    {
        id: '1',
        name: 'Group 1',
        date: '25-May-2020',
        assignments: [
            {
                id: '1',
                name: 'Assignment 1',
                // Assigned_To: 'Beltran',
                // Assignee: 'Romona',
                // Status: 'To-do',
                // Priority: 'Low',
                Due_Date: '25-May-2020',
            },
            {
                id: '2',
                name: 'Assignment 2',
                // Assigned_To: 'Dave',
                // Assignee: 'Romona',
                // Status: 'To-do',
                // Priority: 'Low',
                Due_Date: '26-May-2020',
            },
        ],
    },
    {
        id: '2',
        name: 'Group 2',

        date: '26-May-2020',
        assignments: [
            {
                id: '3',
                name: 'Assignment 3',
                // Assigned_To: 'Beltran',
                // Assignee: 'Romona',
                // Status: 'To-do',
                // Priority: 'Low',
                Due_Date: '25-May-2020',
            },
            {
                id: '4',
                name: 'Assignment 4',
                // Assigned_To: 'Dave',
                // Assignee: 'Romona',
                // Status: 'To-do',
                // Priority: 'Low',
                Due_Date: '26-May-2020',
            },
        ],
    },
];

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
    const { id } = useParams();
    useEffect(() => {
        getData({ courseId: id }).then((data) => {
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
                        <Menu items={courseMenu} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid item xs={12}>
                            <AssignmentsMenu/>
                        </Grid>
                        <Grid item xs={12}>
                            <Group data={groups} assignments={[]} />
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Menu items={courseMenu} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Course;
